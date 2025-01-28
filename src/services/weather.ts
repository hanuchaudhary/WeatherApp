import axios from 'axios';
import type { WeatherData } from '../types/weather';

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export async function getCoordinates(city: string) {
  const response = await axios.get(GEOCODING_API, {
    params: {
      name: city,
      count: 1,
      language: 'en',
      format: 'json'
    }
  });

  if (!response.data.results?.length) {
    throw new Error('City not found');
  }

  return response.data.results[0];
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const response = await axios.get(WEATHER_API, {
    params: {
      latitude: lat,
      longitude: lon,
      current: ['temperature_2m', 'relative_humidity_2m', 'weather_code', 'wind_speed_10m'],
      wind_speed_unit: 'kmh'
    }
  });

  const current = response.data.current;
  
  return {
    temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    weatherCode: current.weather_code
  };
}