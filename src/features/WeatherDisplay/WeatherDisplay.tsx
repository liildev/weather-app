import type React from 'react';
import type { WeatherResponse } from '@/shared/api/types';
import {
	convertTemperature,
	getTemperatureUnit,
	getWeatherIcon,
} from '@/shared/lib/utils';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';

interface WeatherDisplayProps {
	weather: WeatherResponse | null;
	unit: 'celsius' | 'fahrenheit';
	loading: boolean;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
	weather,
	unit,
	loading,
}) => {
	if (loading) {
		return (
			<div className='weather-card flex items-center justify-center h-48'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}

	if (!weather) {
		return (
			<div className='weather-card flex items-center justify-center h-48'>
				<p className='text-gray-500 dark:text-gray-400'>
					No weather data available
				</p>
			</div>
		);
	}

	const temperature = convertTemperature(weather.main.temp, unit);
	const feelsLike = convertTemperature(weather.main.feels_like, unit);
	const tempUnit = getTemperatureUnit(unit);

	return (
		<div className='weather-card animate-fade-in'>
			<div className='text-center mb-6'>
				<div className='text-6xl mb-2'>
					{getWeatherIcon(weather.weather[0].icon)}
				</div>
				<h2 className='text-3xl font-bold mb-2'>
					{temperature}
					{tempUnit}
				</h2>
				<p className='text-lg text-gray-600 dark:text-gray-400 capitalize'>
					{weather.weather[0].description}
				</p>
				<p className='text-sm text-gray-500 dark:text-gray-500'>
					Feels like {feelsLike}
					{tempUnit}
				</p>
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<div className='text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
					<p className='text-sm text-gray-600 dark:text-gray-400'>Humidity</p>
					<p className='text-lg font-semibold'>{weather.main.humidity}%</p>
				</div>
				<div className='text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
					<p className='text-sm text-gray-600 dark:text-gray-400'>Pressure</p>
					<p className='text-lg font-semibold'>{weather.main.pressure} hPa</p>
				</div>
			</div>
		</div>
	);
};
