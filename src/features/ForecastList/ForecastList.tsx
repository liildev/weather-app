import type React from 'react';
import type { ForecastResponse } from '@/shared/api/types';
import {
	convertTemperature,
	getTemperatureUnit,
	getWeatherIcon,
} from '@/shared/lib/utils';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';

interface ForecastListProps {
	forecast: ForecastResponse | null;
	unit: 'celsius' | 'fahrenheit';
	loading: boolean;
}

export const ForecastList: React.FC<ForecastListProps> = ({
	forecast,
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

	if (!forecast) {
		return (
			<div className='weather-card flex items-center justify-center h-48'>
				<p className='text-gray-500 dark:text-gray-400'>
					No forecast data available
				</p>
			</div>
		);
	}

	// Get daily forecasts (one per day)
	const dailyForecasts = forecast.list
		.filter((_, index) => index % 8 === 0)
		.slice(0, 5);
	const tempUnit = getTemperatureUnit(unit);

	return (
		<div className='weather-card animate-fade-in'>
			<h3 className='text-xl font-bold mb-4'>5-Day Forecast</h3>
			<div className='space-y-3'>
				{dailyForecasts.map((item, index) => {
					const date = new Date(item.dt * 1000);
					const dayName =
						index === 0
							? 'Today'
							: date.toLocaleDateString('en-US', { weekday: 'short' });
					const temp = convertTemperature(item.main.temp, unit);

					return (
						<div
							key={item.dt}
							className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'
						>
							<div className='flex items-center space-x-3'>
								<span className='text-2xl'>
									{getWeatherIcon(item.weather[0].icon)}
								</span>
								<div>
									<p className='font-medium'>{dayName}</p>
									<p className='text-sm text-gray-600 dark:text-gray-400 capitalize'>
										{item.weather[0].description}
									</p>
								</div>
							</div>
							<div className='text-right'>
								<p className='text-lg font-semibold'>
									{temp}
									{tempUnit}
								</p>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									{item.main.humidity}% humidity
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
