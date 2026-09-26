import { WeatherData } from '../../shared/schemas/index';

export interface IWeatherProvider {
  getWeather(location?: string): Promise<WeatherData>;
}

export class DemoWeatherProvider implements IWeatherProvider {
  async getWeather(location: string = 'Bengaluru / Cyber City'): Promise<WeatherData> {
    const currentHour = new Date().getHours();
    const isMorning = currentHour >= 5 && currentHour < 12;
    const isCool = currentHour < 7;

    const temp = isCool ? 19 : 23;
    const feelsLike = isCool ? 18 : 24;

    return {
      temperature: temp,
      feelsLike: feelsLike,
      condition: 'Partly Cloudy with Morning Breeze',
      icon: 'CloudSun',
      rainProbability: 25,
      windSpeedKmH: 12,
      severity: 'NORMAL',
      recommendations: [
        'Pleasant morning temperature (23°C). Ideal for walking or outdoor stretch.',
        'Low rain chance (25%). No heavy rain gear required this morning.'
      ]
    };
  }
}

export const weatherProvider: IWeatherProvider = new DemoWeatherProvider();
