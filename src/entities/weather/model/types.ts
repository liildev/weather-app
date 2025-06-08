import type {
	WeatherResponse,
	ForecastResponse,
	City,
} from '@/shared/api/types';

export interface WeatherState {
	currentWeather: WeatherResponse | null;
	forecast: ForecastResponse | null;
	selectedCity: City;
	unit: 'celsius' | 'fahrenheit';
	loading: boolean;
	error: string | null;
	lastUpdated: number | null;
}

export type WeatherAction =
	| { type: 'FETCH_WEATHER_START' }
	| {
			type: 'FETCH_WEATHER_SUCCESS';
			payload: { weather: WeatherResponse; forecast: ForecastResponse };
	  }
	| { type: 'FETCH_WEATHER_ERROR'; payload: string }
	| { type: 'CHANGE_CITY'; payload: City }
	| { type: 'TOGGLE_UNIT' }
	| { type: 'SET_ERROR'; payload: string }
	| { type: 'CLEAR_ERROR' };
