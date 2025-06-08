import type React from 'react';
import { useState } from 'react';
import { useWeatherData } from '@/entities/weather';
import { CitySelector } from '@/features/CitySelector';
import { WeatherDisplay } from '@/features/WeatherDisplay';
import { ForecastList } from '@/features/ForecastList';
import { DataVisualization } from '@/features/DataVisualization';
import { SettingsPanel } from '@/features/SettingsPanel';

type TabType = 'current' | 'forecast' | 'statistics';

export const WeatherWidget: React.FC = () => {
	const [activeTab, setActiveTab] = useState<TabType>('current');
	const weatherData = useWeatherData();

	const {
		currentWeather,
		forecast,
		selectedCity,
		unit,
		loading,
		error,
		lastUpdated,
		actions,
	} = weatherData;

	const tabs: { id: TabType; label: string }[] = [
		{ id: 'current', label: 'Current' },
		{ id: 'forecast', label: 'Forecast' },
		{ id: 'statistics', label: 'Statistics' },
	];

	const renderTabContent = () => {
		switch (activeTab) {
			case 'current':
				return (
					<WeatherDisplay
						weather={currentWeather}
						unit={unit}
						loading={loading}
					/>
				);
			case 'forecast':
				return (
					<ForecastList forecast={forecast} unit={unit} loading={loading} />
				);
			case 'statistics':
				return (
					<DataVisualization
						forecast={forecast}
						unit={unit}
						loading={loading}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<section className='min-h-screen transition-colors duration-300 container flex flex-col lg:flex-row gap-8'>
			{/* Main Content */}
			<div className='flex-1'>
				<header className='mb-6'>
					{/* Header */}
					<div className='mb-6'>
						<h1 className='text-3xl font-bold mb-4 text-center lg:text-left'>
							Weather Dashboard
						</h1>

						{/* City Selector */}
						<CitySelector
							selectedCity={selectedCity}
							onCityChange={actions.changeCity}
							disabled={loading}
						/>
					</div>
				</header>
				{/* Error Display */}
				{error && (
					<div className='mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
						<div className='flex items-center justify-between'>
							<p className='text-red-700 dark:text-red-400'>{error}</p>
							<button
								onClick={actions.clearError}
								className='text-red-500 hover:text-red-700 dark:hover:text-red-300'
							>
								✕
							</button>
						</div>
					</div>
				)}

				{/* Tab Navigation */}
				<div className='flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-6'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
								activeTab === tab.id ? 'tab-active' : 'tab-inactive'
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>

				{/* Tab Content */}
				<div className='animate-fade-in'>{renderTabContent()}</div>
			</div>

			{/* Settings Panel */}
			<div className='lg:col-span-1'>
				<SettingsPanel
					unit={unit}
					onUnitToggle={actions.toggleUnit}
					onRefresh={actions.refetch}
					lastUpdated={lastUpdated}
					loading={loading}
				/>
			</div>
		</section>
	);
};
