export const getWeatherIcon = (iconCode: string): string => {
	const iconMap: Record<string, string> = {
		'01d': '☀️',
		'01n': '🌙',
		'02d': '⛅',
		'02n': '☁️',
		'03d': '☁️',
		'03n': '☁️',
		'04d': '☁️',
		'04n': '☁️',
		'09d': '🌧️',
		'09n': '🌧️',
		'10d': '🌦️',
		'10n': '🌧️',
		'11d': '⛈️',
		'11n': '⛈️',
		'13d': '❄️',
		'13n': '❄️',
		'50d': '🌫️',
		'50n': '🌫️',
	};
	return iconMap[iconCode] || '🌤️';
};

export const formatTime = (
	timestamp: number,
	format: 'time' | 'day' = 'time'
): string => {
	const date = new Date(timestamp * 1000);

	if (format === 'day') {
		return date.toLocaleDateString('en-US', { weekday: 'short' });
	}

	return date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		hour12: true,
	});
};

export const formatLastUpdated = (timestamp: number | null): string => {
	if (!timestamp) return 'Never';
	const date = new Date(timestamp);
	return date.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
	});
};
