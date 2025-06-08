import type { WeatherResponse, ForecastResponse, City } from './types';
import { mockWeatherService } from './mockWeatherService';

const API_KEY = import.meta.env.APP_OWM_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const USE_MOCK = !API_KEY || import.meta.env.DEV;

class WeatherService {
	private lastCallTime = 0;
	private readonly THROTTLE_DELAY = 5000; // 5 seconds

	private async throttledFetch<T>(fetchFn: () => Promise<T>): Promise<T> {
		const now = Date.now();
		const timeSinceLastCall = now - this.lastCallTime;

		if (timeSinceLastCall < this.THROTTLE_DELAY) {
			const waitTime = this.THROTTLE_DELAY - timeSinceLastCall;
			await new Promise((resolve) => setTimeout(resolve, waitTime));
		}

		this.lastCallTime = Date.now();
		return fetchFn();
	}

	async getCurrentWeather(city: City): Promise<WeatherResponse> {
		if (USE_MOCK) {
			return mockWeatherService.getCurrentWeather(city);
		}

		return this.throttledFetch(async () => {
			const response = await fetch(
				`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
			);

			if (!response.ok) {
				throw new Error(`Failed to fetch weather data: ${response.statusText}`);
			}

			return response.json();
		});
	}

	async getForecast(city: City): Promise<ForecastResponse> {
		if (USE_MOCK) {
			return mockWeatherService.getForecast(city);
		}

		return this.throttledFetch(async () => {
			const response = await fetch(
				`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
			);

			if (!response.ok) {
				throw new Error(
					`Failed to fetch forecast data: ${response.statusText}`
				);
			}

			return response.json();
		});
	}
}

export const weatherService = new WeatherService();
