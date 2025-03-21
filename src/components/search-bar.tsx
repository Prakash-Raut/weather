import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
	onSearch: (city: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [query, setQuery] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (query.trim()) {
			onSearch(query.trim());
			setQuery("");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-md">
			<div className="relative">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search for a city..."
					className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500"
				/>
				<Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
			</div>
		</form>
	);
};
