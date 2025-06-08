import { useReducer, useEffect, useCallback } from 'react';
import { weatherService } from '@/shared/api';
import type { City } from '@/shared/api/types';
import { weatherReducer, initialWeatherState } from '../model';

export const useWeatherData = () => {
	const [state, dispatch] = useReducer(weatherReducer, initialWeatherState);

	const fetchWeatherData = useCallback(async (city: City) => {
		dispatch({ type: 'FETCH_WEATHER_START' });

		try {
			const [weather, forecast] = await Promise.all([
				weatherService.getCurrentWeather(city),
				weatherService.getForecast(city),
			]);

			dispatch({
				type: 'FETCH_WEATHER_SUCCESS',
				payload: { weather, forecast },
			});
		} catch (error) {
			const message =
				error instanceof Error ? error.message : 'Failed to fetch weather data';
			dispatch({ type: 'FETCH_WEATHER_ERROR', payload: message });
		}
	}, []);

	const changeCity = useCallback((city: City) => {
		dispatch({ type: 'CHANGE_CITY', payload: city });
	}, []);

	const toggleUnit = useCallback(() => {
		dispatch({ type: 'TOGGLE_UNIT' });
	}, []);

	const clearError = useCallback(() => {
		dispatch({ type: 'CLEAR_ERROR' });
	}, []);

	const setError = useCallback((error: string) => {
		dispatch({ type: 'SET_ERROR', payload: error });
	}, []);

	// Fetch data when city changes
	useEffect(() => {
		fetchWeatherData(state.selectedCity);
	}, [state.selectedCity, fetchWeatherData]);

	return {
		...state,
		actions: {
			changeCity,
			toggleUnit,
			clearError,
			setError,
			refetch: () => fetchWeatherData(state.selectedCity),
		},
	};
};
