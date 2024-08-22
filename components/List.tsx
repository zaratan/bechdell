'use client';

import React, { useMemo } from 'react';
import { Movie as MovieType } from '@/types/Movie';
import SearchBar from './SearchBar';
import Movie from './Movie';

const List = ({ data }: { data: Array<MovieType> }) => {
  const [filter, setFilter] = React.useState('');

  const filteredData = useMemo(() => {
    return data.filter((movie) =>
      movie.movieTitle?.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);
  const trimmedData = filteredData.slice(0, 1000);

  return (
    <div>
      <SearchBar filter={filter} setFilter={setFilter} />
      <ul role="list" className="divide-y divide-white/5">
        {trimmedData.map((movie, index) => (
          <Movie key={index} movie={movie} />
        ))}
      </ul>
    </div>
  );
};

export default List;
