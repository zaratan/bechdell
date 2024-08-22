import { Movie as MovieType } from '@/types/Movie';
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { XCircleIcon } from '@heroicons/react/24/solid';
import classNames from '@/helpers/classNames';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const statuses = {
  unknown: 'text-gray-500 bg-gray-100/10',
  passing: 'text-green-500 bg-green-500/10',
  notPassing: 'text-red-600 bg-red-600/10',
};

const Movie = ({ movie }: { movie: MovieType }) => {
  return (
    <li
      key={movie.movieTitle}
      className="relative flex items-center space-x-4 py-4"
    >
      <div className="min-w-0 flex-auto">
        <div className="flex items-center gap-x-3">
          <div
            className={classNames(
              statuses[movie.result ? 'passing' : 'notPassing'],
              'flex-none rounded-full p-1'
            )}
          >
            <div className="h-2 w-2 rounded-full bg-current" />
            <span className="sr-only">
              {movie.result ? 'Passing' : 'Not passing'}
            </span>
          </div>
          <h2 className="min-w-0 text-sm font-semibold leading-6">
            <a
              href={movie.imdbLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="whitespace-nowrap">{movie.movieTitle}</span>
              <span className="absolute inset-0" />
            </a>
          </h2>
        </div>
        <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
          <p className="truncate">{movie.comment}</p>
          <svg
            viewBox="0 0 2 2"
            className="h-0.5 w-0.5 flex-none fill-gray-300"
          >
            <circle r={1} cx={1} cy={1} />
          </svg>
        </div>
      </div>
      <ChevronRightIcon
        aria-hidden="true"
        className="h-5 w-5 flex-none text-gray-400"
      />
    </li>
  );
};

export default Movie;
