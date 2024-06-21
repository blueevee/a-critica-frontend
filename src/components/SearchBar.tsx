import React, { FC } from 'react';
import '../style/SearchBar.css'

interface SearchProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar: FC<SearchProps> = ({ onSearch }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <form className='search-restaurants'>
            <input
                type="text"
                placeholder="Pesquise um restaurante"
                onChange={handleChange}
            />
        </form>
    );
};

export default SearchBar;
