import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SuggestionsDropdown from './SuggestionsDropdown';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input } from './ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import {
	AcademicCapIcon,
	CircleStackIcon,
	WrenchScrewdriverIcon,
	DocumentTextIcon,
	ShareIcon,
} from '@heroicons/react/20/solid';

interface SearchBarProps {
	onSearch: (query: string, category: string) => void;
	suggestions: any[];
	onSuggestionSelect: (suggestion: any) => void;
	category: string;
	onCategoryChange: (category: string) => void;
	fetchSuggestions: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
	onSearch,
	suggestions,
	onSuggestionSelect,
	category,
	onCategoryChange,
	fetchSuggestions,
}) => {
	const [query, setQuery] = useState('');
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [inputFocused, setInputFocused] = useState(false);
	const suggestionsRef = useRef<HTMLUListElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate(); // Use useNavigate for navigation

	useEffect(() => {
		if (query && inputFocused) {
			fetchSuggestions(query);
			setShowSuggestions(true);
		} else {
			setShowSuggestions(false);
		}
	}, [query, inputFocused, fetchSuggestions]);

	const handleSuggestionClick = (suggestion: any) => {
		setQuery(suggestion.label);
		onSuggestionSelect(suggestion); // Trigger search using the suggestion's label
		setShowSuggestions(false);
		navigate(`/search?q=${suggestion.label}&category=${category}`); // Navigate with query and category
	};

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(query, category);
		navigate(`/search?q=${query}&category=${category}`); // Navigate to the search URL
	};

	const handleClear = () => {
		setQuery('');
		setShowSuggestions(false);
		onSearch('', category);
		navigate('/');
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			suggestionsRef.current &&
			!suggestionsRef.current.contains(event.target as Node) &&
			inputRef.current &&
			!inputRef.current.contains(event.target as Node)
		) {
			setShowSuggestions(false);
			setInputFocused(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='flex justify-between py-3 px-6 bg-gray-50 border-b space-x-6'>
			<form
				onSubmit={handleSearchSubmit}
				className='mb-4 relative w-full max-w-lg'>
				<div className='flex space-x-4'>
					<div className='relative flex flex-items-center text-gray-400 focus-within:text-gray-600'>
						<MagnifyingGlassIcon className='h-5 w-5 absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none' />

						<Input
							ref={inputRef}
							type='text'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className=' w-[400px] pr-3 pl-10 pz-2  font-semibold placeholder-gray-500 text-black  border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2'
							placeholder='Search...'
							onFocus={() => setInputFocused(true)}
						/>
					</div>
					<div className='relative flex space-x-2'>
						<Select
							value={category}
							onValueChange={onCategoryChange}>
							<SelectTrigger className='  flex justify-evenly w-[196px]'>
								<SelectValue placeholder='Select a category' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>All categories</SelectItem>
								<div className='flex space-x-2 relative'>
									<SelectItem value='tool-or-service'>
										<WrenchScrewdriverIcon className='w-4 h-4 mr-2 absolute left-2' />
										Tools & services
									</SelectItem>
								</div>
								<div className='flex space-x-2 relative'>
									<SelectItem value='training-material'>
										<AcademicCapIcon className='w-4 h-4 mr-2 absolute left-2' />
										Training materials
									</SelectItem>
								</div>
								<div className='flex space-x-2 relative'>
									<SelectItem value='publication'>
										<DocumentTextIcon className='w-4 h-4 mr-2 absolute left-2' />
										Publications
									</SelectItem>
								</div>
								<div className='flex space-x-2 relative'>
									<SelectItem value='dataset'>
										<CircleStackIcon className='w-4 h-4 mr-2 absolute left-2' />
										Datasets
									</SelectItem>
								</div>
								<div className='flex space-x-2 relative'>
									<SelectItem value='workflow'>
										<ShareIcon className='w-4 h-4 mr-2 absolute left-2' />
										Workflows
									</SelectItem>
								</div>
							</SelectContent>
						</Select>
					</div>

					<Button
						type='submit'
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
						Search
					</Button>

					<Button
						type='button'
						onClick={handleClear}
						className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
						Clear
					</Button>
				</div>

				{showSuggestions && query && (
					<SuggestionsDropdown
						ref={suggestionsRef}
						suggestions={suggestions}
						onSuggestionSelect={handleSuggestionClick}
					/>
				)}
			</form>
		</div>
	);
};

export default SearchBar;
