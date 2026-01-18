import { createContext } from 'react';
import type { MoviesStore } from './MoviesStore';

export const MovieContext = createContext<MoviesStore | null>(null);
