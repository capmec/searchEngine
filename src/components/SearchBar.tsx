import { useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
	const [query, setQuery] = useState<string>('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(query);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col space-y-4'>
			<input
				type='text'
				className='border rounded p-2'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder='Search for tools or services...'
			/>
			<button
				type='submit'
				className='bg-blue-500 text-white p-2 rounded'>
				Search
			</button>
		</form>
	);
};

export default SearchBar;
