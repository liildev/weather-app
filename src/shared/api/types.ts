export interface WeatherData {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface MainWeatherInfo {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
}

export interface WeatherResponse {
	weather: WeatherData[];
	main: MainWeatherInfo;
	name: string;
	dt: number;
}

export interface ForecastItem {
	dt: number;
	main: MainWeatherInfo;
	weather: WeatherData[];
	dt_txt: string;
}

export interface ForecastResponse {
	list: ForecastItem[];
	city: {
		name: string;
		country: string;
	};
}

export type City = 'London' | 'New York' | 'Tokyo' | 'Sydney' | 'Cairo';
