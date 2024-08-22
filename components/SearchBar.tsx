import React from 'react';

const SearchBar = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (newFilter: string) => void;
}) => {
  return (
    <div className="flex flex-row items-center justify-center">
      <input
        type="text"
        placeholder="Search for a movie"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default SearchBar;
