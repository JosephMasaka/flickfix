import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private apiKey = 'eeb61bdc3a426b35a6564e7cfce2e1bd';
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor() {}

  searchMoviesAndTV(query: string): Observable<any[]> {
    if (!query.trim()) return from(Promise.resolve([])); // Return an empty array observable if query is empty

    const movieSearch = this.fetchWithAxios('movie', query);
    const tvSearch = this.fetchWithAxios('tv', query);

    return from(
      Promise.all([movieSearch, tvSearch])
        .then(([movies, tvShows]) => {
          const formattedMovies = movies?.results?.map((movie: any) => ({
            ...movie,
            type: 'movie'
          })) || [];
          const formattedTvShows = tvShows?.results?.map((tv: any) => ({
            ...tv,
            type: 'tv'
          })) || [];
          return [...formattedMovies, ...formattedTvShows];
        })
        .catch(() => [])
    );
  }

  private async fetchWithAxios(type: 'movie' | 'tv', query: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/search/${type}`, {
        params: {
          api_key: this.apiKey,
          query: query,
          language: 'en-US',
          page: '1'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      return { results: [] }; // Return an empty array in case of error
    }
  }
}
