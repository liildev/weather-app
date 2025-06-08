import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useWeatherData } from './useWeatherData';

vi.mock('@/shared/api', () => ({
	weatherService: {
		getCurrentWeather: vi.fn(),
		getForecast: vi.fn(),
	},
}));

describe('useWeatherData', () => {
	it('should initialize with default state', () => {
		const { result } = renderHook(() => useWeatherData());

		expect(result.current.selectedCity).toBe('London');
		expect(result.current.unit).toBe('celsius');
		expect(result.current.loading).toBe(true);
		expect(result.current.error).toBe(null);
		expect(result.current.currentWeather).toBe(null);
		expect(result.current.forecast).toBe(null);
	});

	it('should provide action functions', () => {
		const { result } = renderHook(() => useWeatherData());

		expect(typeof result.current.actions.changeCity).toBe('function');
		expect(typeof result.current.actions.toggleUnit).toBe('function');
		expect(typeof result.current.actions.clearError).toBe('function');
		expect(typeof result.current.actions.setError).toBe('function');
		expect(typeof result.current.actions.refetch).toBe('function');
	});
});
