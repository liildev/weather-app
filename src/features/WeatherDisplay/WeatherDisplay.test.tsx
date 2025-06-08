import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { WeatherDisplay } from './WeatherDisplay';
import type { WeatherResponse } from '@/shared/api/types';

const mockWeatherData: WeatherResponse = {
	weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
	main: {
		temp: 25,
		feels_like: 27,
		temp_min: 22,
		temp_max: 28,
		pressure: 1013,
		humidity: 60,
	},
	name: 'London',
	dt: Date.now() / 1000,
};

describe('WeatherDisplay', () => {
	it('should render loading spinner when loading', () => {
		const { container } = render(
			<WeatherDisplay weather={null} unit='celsius' loading={true} />
		);

		expect(container.querySelector('.animate-spin')).toBeInTheDocument();
	});

	it('should render no data message when weather is null', () => {
		const { getByText } = render(
			<WeatherDisplay weather={null} unit='celsius' loading={false} />
		);

		expect(getByText('No weather data available')).toBeInTheDocument();
	});

	it('should render weather data correctly', () => {
		const { getByText } = render(
			<WeatherDisplay
				weather={mockWeatherData}
				unit='celsius'
				loading={false}
			/>
		);

		expect(getByText('25°C')).toBeInTheDocument();
		expect(getByText('clear sky')).toBeInTheDocument();
		expect(getByText('Feels like 27°C')).toBeInTheDocument();
		expect(getByText('60%')).toBeInTheDocument();
		expect(getByText('1013 hPa')).toBeInTheDocument();
	});

	it('should convert temperature to fahrenheit', () => {
		const { getByText } = render(
			<WeatherDisplay
				weather={mockWeatherData}
				unit='fahrenheit'
				loading={false}
			/>
		);

		expect(getByText('77°F')).toBeInTheDocument();
		expect(getByText('Feels like 81°F')).toBeInTheDocument();
	});

	it('should match snapshot', () => {
		const { container } = render(
			<WeatherDisplay
				weather={mockWeatherData}
				unit='celsius'
				loading={false}
			/>
		);

		expect(container.firstChild).toMatchSnapshot();
	});
});
