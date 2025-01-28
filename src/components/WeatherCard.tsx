import { Droplets, Wind } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { WeatherData, LocationData } from '../types/weather';
import { getWeatherInfo } from '../utils/weatherCodes';

interface WeatherCardProps {
  weather: WeatherData;
  location: LocationData;
}

export function WeatherCard({ weather, location }: WeatherCardProps) {
  const weatherInfo = getWeatherInfo(weather.weatherCode);
  const WeatherIcon = Icons[weatherInfo.icon as keyof typeof Icons];

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-lg w-full max-w-md transform transition-all duration-500 hover:scale-[1.02]">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {location.name}
          <span className="text-lg font-normal text-gray-600 ml-2">
            {location.admin1 && `${location.admin1},`} {location.country}
          </span>
        </h2>
        <div className="flex items-center justify-center gap-4 mb-4">
          <WeatherIcon size={48} className="text-blue-500" />
          <p className="text-6xl font-bold text-gray-900">
            {Math.round(weather.temperature)}°C
          </p>
        </div>
        <p className="text-xl text-gray-600">{weatherInfo.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 bg-stone-200 p-4 rounded-xl">
          <Droplets className="text-blue-500" size={24} />
          <div>
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="text-lg font-semibold text-gray-800">{Math.round(weather.humidity)}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-stone-200 p-4 rounded-xl">
          <Wind className="text-blue-500" size={24} />
          <div>
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="text-lg font-semibold text-gray-800">{Math.round(weather.windSpeed)} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}