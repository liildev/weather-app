import type React from 'react';
import type { ForecastResponse } from '@/shared/api/types';
import {
	convertTemperature,
	formatTime,
	getTemperatureUnit,
} from '@/shared/lib/utils';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';

interface DataVisualizationProps {
	forecast: ForecastResponse | null;
	unit: 'celsius' | 'fahrenheit';
	loading: boolean;
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({
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

	const chartHeight = 300;
	const chartPadding = { top: 30, right: 20, bottom: 60, left: 40 };

	const displayData = forecast.list.slice(0, 8);
	const temps = displayData.map((point) => point.main.temp);
	const minTemp = Math.min(...temps);
	const maxTemp = Math.max(...temps);
	const tempRange = Math.max(1, maxTemp - minTemp);

	const getX = (index: number) =>
		chartPadding.left +
		(index / (displayData.length - 1)) *
			(800 - chartPadding.left - chartPadding.right);

	const getY = (temp: number) =>
		chartPadding.top +
		((maxTemp - temp) / tempRange) *
			(chartHeight - chartPadding.top - chartPadding.bottom);

	const formatTempWithUnit = (temp: number) =>
		`${convertTemperature(temp, unit)}${getTemperatureUnit(unit)}`;

	return (
		<div className='weather-card animate-fade-in'>
			<h3 className='text-xl font-bold mb-4'>24-Hour Temperature Trend</h3>

			<svg
				className='w-full h-full'
				viewBox={`0 0 800 ${chartHeight}`}
				preserveAspectRatio='xMidYMid meet'
			>
				<g stroke='#e5e7eb' strokeWidth='0.5'>
					{[
						minTemp,
						minTemp + tempRange * 0.25,
						minTemp + tempRange * 0.5,
						minTemp + tempRange * 0.75,
						maxTemp,
					].map((temp, i) => (
						<line
							key={`hline-${i}`}
							x1={chartPadding.left}
							y1={getY(temp)}
							x2={800 - chartPadding.right}
							y2={getY(temp)}
						/>
					))}
				</g>

				<path
					d={displayData
						.map((point, i) => {
							const x = getX(i);
							const y = getY(point.main.temp);
							return `${i === 0 ? 'M' : 'L'}${x},${y}`;
						})
						.join(' ')}
					fill='none'
					stroke='#3b82f6'
					strokeWidth='2'
					strokeLinejoin='round'
					strokeLinecap='round'
				/>

				{displayData.map((point, i) => {
					const x = getX(i);
					const y = getY(point.main.temp);

					return (
						<g key={`point-${point.dt}-${i}`}>
							<text
								x={x}
								y={y - 10}
								textAnchor='middle'
								fontSize='16'
								fill='currentColor'
								className='text-gray-700 dark:text-gray-200'
							>
								{formatTempWithUnit(point.main.temp)}
							</text>

							<circle
								cx={x}
								cy={y}
								r='4'
								fill='#3b82f6'
								stroke='white'
								strokeWidth='1.5'
							/>

							<text
								x={x}
								y={chartHeight - 25}
								textAnchor='middle'
								fontSize='16'
								fill='#6b7280'
							>
								{formatTime(point.dt, 'time')}
							</text>
						</g>
					);
				})}

				{displayData.map((_, i) => (
					<line
						key={`divider-${i}`}
						x1={getX(i)}
						y1={chartHeight - chartPadding.bottom + 10}
						x2={getX(i)}
						y2={chartHeight - chartPadding.bottom + 15}
						stroke='#6b7280'
						strokeWidth='1'
					/>
				))}
			</svg>

			<div className='flex justify-between mt-4 text-sm'>
				<div className='bg-blue-50 text-blue-800 px-2 py-1 rounded dark:bg-blue-900/20 dark:text-blue-300'>
					Min: {formatTempWithUnit(minTemp)}
				</div>
				<div className='bg-amber-50 text-amber-800 px-2 py-1 rounded dark:bg-amber-900/20 dark:text-amber-300'>
					Avg:{' '}
					{formatTempWithUnit(temps.reduce((a, b) => a + b, 0) / temps.length)}
				</div>
				<div className='bg-red-50 text-red-800 px-2 py-1 rounded dark:bg-red-900/20 dark:text-red-300'>
					Max: {formatTempWithUnit(maxTemp)}
				</div>
			</div>
		</div>
	);
};
