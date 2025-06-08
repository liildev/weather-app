import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import type { City } from '@/shared/api/types';
import { useDebounce } from '@/shared/lib/hooks';

interface CitySelectorProps {
	selectedCity: City;
	onCityChange: (city: City) => void;
	disabled?: boolean;
}

const CITIES: City[] = ['London', 'New York', 'Tokyo', 'Sydney', 'Cairo'];

export const CitySelector: React.FC<CitySelectorProps> = ({
	selectedCity,
	onCityChange,
	disabled = false,
}) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [error, setError] = useState('');

	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	const filteredCities = CITIES.filter((city) =>
		city.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
	);

	const handleCitySelect = (city: City) => {
		if (CITIES.includes(city)) {
			onCityChange(city);
			setIsOpen(false);
			setSearchTerm('');
			setError('');
		} else {
			setError('Please select a valid city from the list');
		}
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		setError('');
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div className='relative max-w-xs mx-auto lg:mx-0' ref={wrapperRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				disabled={disabled}
				className='w-full px-4 py-2 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2  focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed'
			>
				<span className='block truncate'>{selectedCity}</span>
				<span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
					<svg
						className='w-5 h-5 text-gray-400'
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path
							fillRule='evenodd'
							d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
							clipRule='evenodd'
						/>
					</svg>
				</span>
			</button>

			{isOpen && (
				<div className='absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden'>
					<div className='p-2'>
						<input
							type='text'
							placeholder='Search cities...'
							value={searchTerm}
							onChange={handleSearchChange}
							className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent'
						/>
						{error && (
							<p className='mt-1 text-sm text-red-600 dark:text-red-400'>
								{error}
							</p>
						)}
					</div>

					<ul className='max-h-60 overflow-auto'>
						{filteredCities.length > 0 ? (
							filteredCities.map((city) => (
								<li key={city}>
									<button
										onClick={() => handleCitySelect(city)}
										className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 ${
											city === selectedCity ? 'bg-primary text-white' : ''
										}`}
									>
										{city}
									</button>
								</li>
							))
						) : (
							<li className='px-4 py-2 text-gray-500 dark:text-gray-400'>
								No cities found
							</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
};
