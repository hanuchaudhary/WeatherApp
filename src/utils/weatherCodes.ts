interface WeatherInfo {
  description: string;
  icon: string;
}

const weatherCodes: Record<number, WeatherInfo> = {
  0: { description: 'Clear sky', icon: 'Sun' },
  1: { description: 'Mainly clear', icon: 'SunDim' },
  2: { description: 'Partly cloudy', icon: 'Cloud' },
  3: { description: 'Overcast', icon: 'CloudSun' },
  45: { description: 'Foggy', icon: 'CloudFog' },
  48: { description: 'Depositing rime fog', icon: 'CloudFog' },
  51: { description: 'Light drizzle', icon: 'CloudDrizzle' },
  53: { description: 'Moderate drizzle', icon: 'CloudDrizzle' },
  55: { description: 'Dense drizzle', icon: 'CloudDrizzle' },
  61: { description: 'Slight rain', icon: 'CloudRain' },
  63: { description: 'Moderate rain', icon: 'CloudRain' },
  65: { description: 'Heavy rain', icon: 'CloudRain' },
  71: { description: 'Slight snow fall', icon: 'CloudSnow' },
  73: { description: 'Moderate snow fall', icon: 'CloudSnow' },
  75: { description: 'Heavy snow fall', icon: 'CloudSnow' },
  77: { description: 'Snow grains', icon: 'CloudSnow' },
  80: { description: 'Slight rain showers', icon: 'CloudRain' },
  81: { description: 'Moderate rain showers', icon: 'CloudRain' },
  82: { description: 'Violent rain showers', icon: 'CloudRain' },
  85: { description: 'Slight snow showers', icon: 'CloudSnow' },
  86: { description: 'Heavy snow showers', icon: 'CloudSnow' },
  95: { description: 'Thunderstorm', icon: 'CloudLightning' },
  96: { description: 'Thunderstorm with slight hail', icon: 'CloudLightning' },
  99: { description: 'Thunderstorm with heavy hail', icon: 'CloudLightning' }
};

export function getWeatherInfo(code: number): WeatherInfo {
  return weatherCodes[code] || { description: 'Unknown', icon: 'Cloud' };
}