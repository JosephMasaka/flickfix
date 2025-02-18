import { Injectable, WritableSignal, signal } from '@angular/core';
import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'eeb61bdc3a426b35a6564e7cfce2e1bd'; //eeb61bdc3a426b35a6564e7cfce2e1bd

@Injectable({ providedIn: 'root' })
export class MovieService {
  movies: WritableSignal<any[]> = signal([]); // ✅ Use WritableSignal

  async fetchTrendingMovies() {
    try {
      const response = await axios.get(`${API_URL}/trending/movie/week?api_key=${API_KEY}`);
      this.movies.set(response.data.results); // ✅ Now this works
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }
}
