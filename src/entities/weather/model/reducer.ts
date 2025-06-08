import type { WeatherState, WeatherAction } from './types';

export const initialWeatherState: WeatherState = {
	currentWeather: null,
	forecast: null,
	selectedCity: 'London',
	unit: 'celsius',
	loading: false,
	error: null,
	lastUpdated: null,
};

export const weatherReducer = (
	state: WeatherState,
	action: WeatherAction
): WeatherState => {
	switch (action.type) {
		case 'FETCH_WEATHER_START':
			return {
				...state,
				loading: true,
				error: null,
			};

		case 'FETCH_WEATHER_SUCCESS':
			return {
				...state,
				loading: false,
				currentWeather: action.payload.weather,
				forecast: action.payload.forecast,
				error: null,
				lastUpdated: Date.now(),
			};

		case 'FETCH_WEATHER_ERROR':
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case 'CHANGE_CITY':
			return {
				...state,
				selectedCity: action.payload,
				currentWeather: null,
				forecast: null,
				error: null,
			};

		case 'TOGGLE_UNIT':
			return {
				...state,
				unit: state.unit === 'celsius' ? 'fahrenheit' : 'celsius',
			};

		case 'SET_ERROR':
			return {
				...state,
				error: action.payload,
				loading: false,
			};

		case 'CLEAR_ERROR':
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};
