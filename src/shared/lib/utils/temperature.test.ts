import { describe, it, expect } from 'vitest';
import { convertTemperature, getTemperatureUnit } from './temperature';

describe('Temperature Utils', () => {
	describe('convertTemperature', () => {
		it('should convert celsius to fahrenheit correctly', () => {
			expect(convertTemperature(0, 'fahrenheit')).toBe(32);
			expect(convertTemperature(100, 'fahrenheit')).toBe(212);
			expect(convertTemperature(25, 'fahrenheit')).toBe(77);
		});

		it('should return celsius unchanged', () => {
			expect(convertTemperature(0, 'celsius')).toBe(0);
			expect(convertTemperature(25, 'celsius')).toBe(25);
			expect(convertTemperature(-10, 'celsius')).toBe(-10);
		});

		it('should round to nearest integer', () => {
			expect(convertTemperature(25.7, 'celsius')).toBe(26);
			expect(convertTemperature(25.3, 'celsius')).toBe(25);
		});
	});

	describe('getTemperatureUnit', () => {
		it('should return correct unit symbols', () => {
			expect(getTemperatureUnit('celsius')).toBe('°C');
			expect(getTemperatureUnit('fahrenheit')).toBe('°F');
		});
	});
});
