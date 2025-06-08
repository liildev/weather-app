export const convertTemperature = (
	temp: number,
	unit: 'celsius' | 'fahrenheit'
): number => {
	if (unit === 'fahrenheit') {
		return Math.round((temp * 9) / 5 + 32);
	}
	return Math.round(temp);
};

export const getTemperatureUnit = (unit: 'celsius' | 'fahrenheit'): string => {
	return unit === 'celsius' ? '°C' : '°F';
};
