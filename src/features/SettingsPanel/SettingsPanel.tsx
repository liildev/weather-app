import type React from 'react';
import { useTheme } from '@/app/providers';
import { formatLastUpdated } from '@/shared/lib/utils';

interface SettingsPanelProps {
	unit: 'celsius' | 'fahrenheit';
	onUnitToggle: () => void;
	onRefresh: () => void;
	lastUpdated: number | null;
	loading: boolean;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
	unit,
	onUnitToggle,
	onRefresh,
	lastUpdated,
	loading,
}) => {
	const { theme, toggleTheme } = useTheme();

	const toggleBase =
		'relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary';

	const circleBase =
		'inline-block h-4 w-4 transform rounded-full bg-white transition-transform';

	return (
		<aside className='weather-card h-fit w-full lg:w-80 flex-shrink-0'>
			<h3 className='text-lg font-semibold mb-5'>Settings</h3>

			<ul className='space-y-5 text-sm'>
				<li className='flex items-center justify-between'>
					<label htmlFor='unit-toggle' className='font-medium'>
						Temperature Unit
					</label>
					<div className='flex items-center gap-2'>
						<button
							id='unit-toggle'
							onClick={onUnitToggle}
							aria-label='Toggle temperature unit'
							className={toggleBase}
						>
							<span
								className={`${circleBase} ${
									unit === 'fahrenheit' ? 'translate-x-6' : 'translate-x-1'
								}`}
							/>
						</button>
						<span className='text-gray-600 dark:text-gray-400 w-5'>
							{unit === 'celsius' ? '°C' : '°F'}
						</span>
					</div>
				</li>

				<li className='flex items-center justify-between'>
					<label htmlFor='theme-toggle' className='font-medium'>
						Theme
					</label>
					<div className='flex items-center gap-2'>
						<button
							id='theme-toggle'
							onClick={toggleTheme}
							aria-label='Toggle color theme'
							className={toggleBase}
						>
							<span
								className={`${circleBase} ${
									theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
								}`}
							/>
						</button>
						<span className='text-gray-600 dark:text-gray-400 w-5'>
							{theme === 'dark' ? '🌙' : '☀️'}
						</span>
					</div>
				</li>

				<li className='flex items-center justify-between'>
					<label className='font-medium'>Data Refresh</label>
					<button
						onClick={onRefresh}
						disabled={loading}
						className='px-3 py-1 text-sm bg-primary text-white rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity'
					>
						{loading ? 'Refreshing...' : 'Refresh'}
					</button>
				</li>
			</ul>

			<footer className='mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400'>
				Last updated: {formatLastUpdated(lastUpdated)}
			</footer>
		</aside>
	);
};
