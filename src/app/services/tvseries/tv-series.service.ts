import { Injectable, WritableSignal, signal } from '@angular/core';
import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'eeb61bdc3a426b35a6564e7cfce2e1bd'; //eeb61bdc3a426b35a6564e7cfce2e1bd

@Injectable({ providedIn: 'root' })
export class TvSeriesService {
    tvseries: WritableSignal<any[]> = signal([]); // ✅ Use WritableSignal

  async fetchTrendingTvSeries() {
    try {
      const response = await axios.get(`${API_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
      this.tvseries.set(response.data.results); // ✅ Now this works
    } catch (error) {
      console.error('Error fetching Tv Series:', error);
    }
  }
}
