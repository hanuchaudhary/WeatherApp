import { useState } from "react";
import { Cloud, AlertCircle } from "lucide-react";
import { WeatherCard } from "./components/WeatherCard";
import { SearchBar } from "./components/SearchBar";
import { getCoordinates, getWeather } from "./services/weather";
import type { WeatherData, LocationData, WeatherError } from "./types/weather";

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<WeatherError | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const locationData = await getCoordinates(city);
      const weatherData = await getWeather(
        locationData.latitude,
        locationData.longitude
      );

      setLocation(locationData);
      setWeather(weatherData);
    } catch (err) {
      setError({
        message:
          err instanceof Error ? err.message : "Failed to fetch weather data",
      });
      setWeather(null);
      setLocation(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-4xl flex flex-col items-center">
        <div className="flex items-center gap-3 mb-8">
          <Cloud className="text-white" size={40} />
          <h1 className="text-4xl font-bold text-white">Weather App</h1>
        </div>

        <SearchBar onSearch={fetchWeather} />

        {loading ? (
          <div className="animate-pulse bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-lg w-full max-w-md">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-16 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ) : (
          weather &&
          location && <WeatherCard weather={weather} location={location} />
        )}

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl flex items-center gap-2 mb-4">
            <AlertCircle size={20} />
            <p>{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
