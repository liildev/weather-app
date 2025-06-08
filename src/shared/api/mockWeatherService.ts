import type { WeatherResponse, ForecastResponse, City } from './types';

const mockWeatherData: Record<City, WeatherResponse> = {
	London: {
		weather: [
			{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
		],
		main: {
			temp: 15,
			feels_like: 13,
			temp_min: 12,
			temp_max: 18,
			pressure: 1013,
			humidity: 65,
		},
		name: 'London',
		dt: Date.now() / 1000,
	},
	'New York': {
		weather: [
			{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
		],
		main: {
			temp: 22,
			feels_like: 24,
			temp_min: 19,
			temp_max: 25,
			pressure: 1015,
			humidity: 55,
		},
		name: 'New York',
		dt: Date.now() / 1000,
	},
	Tokyo: {
		weather: [
			{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' },
		],
		main: {
			temp: 18,
			feels_like: 17,
			temp_min: 16,
			temp_max: 20,
			pressure: 1008,
			humidity: 78,
		},
		name: 'Tokyo',
		dt: Date.now() / 1000,
	},
	Sydney: {
		weather: [
			{ id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' },
		],
		main: {
			temp: 25,
			feels_like: 27,
			temp_min: 23,
			temp_max: 28,
			pressure: 1020,
			humidity: 60,
		},
		name: 'Sydney',
		dt: Date.now() / 1000,
	},
	Cairo: {
		weather: [
			{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
		],
		main: {
			temp: 30,
			feels_like: 35,
			temp_min: 28,
			temp_max: 33,
			pressure: 1012,
			humidity: 40,
		},
		name: 'Cairo',
		dt: Date.now() / 1000,
	},
};

const generateForecastData = (city: City): ForecastResponse => {
	const baseTemp = mockWeatherData[city].main.temp;
	const list = Array.from({ length: 40 }, (_, i) => ({
		dt: Date.now() / 1000 + i * 3 * 60 * 60, // 3-hour intervals
		main: {
			temp: baseTemp + Math.random() * 10 - 5,
			feels_like: baseTemp + Math.random() * 8 - 4,
			temp_min: baseTemp - 3,
			temp_max: baseTemp + 3,
			pressure: 1013 + Math.random() * 20 - 10,
			humidity: 50 + Math.random() * 30,
		},
		weather: [mockWeatherData[city].weather[0]],
		dt_txt: new Date(
			(Date.now() / 1000 + i * 3 * 60 * 60) * 1000
		).toISOString(),
	}));

	return {
		list,
		city: { name: city, country: 'XX' },
	};
};

export const mockWeatherService = {
	getCurrentWeather: async (city: City): Promise<WeatherResponse> => {
		await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay

		if (!mockWeatherData[city]) {
			throw new Error(`Weather data not found for ${city}`);
		}

		return mockWeatherData[city];
	},

	getForecast: async (city: City): Promise<ForecastResponse> => {
		await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay

		if (!mockWeatherData[city]) {
			throw new Error(`Forecast data not found for ${city}`);
		}

		return generateForecastData(city);
	},
};
