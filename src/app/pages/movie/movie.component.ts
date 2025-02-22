import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'eeb61bdc3a426b35a6564e7cfce2e1bd';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  templateUrl: './movie.component.html',
  styles: [``],
  imports: [CommonModule]
})
export class MovieComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  movie: any = null;
  relatedMovies: any[] = [];
  router = inject(Router);

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    await this.fetchMovieDetails(id);
    await this.fetchRelatedMovies(id);
  }

  async fetchMovieDetails(id: string) {
    try {
      const response = await axios.get(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
      this.movie = response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  }

  async fetchRelatedMovies(id: string) {
    try {
      const response = await axios.get(`${API_URL}/movie/${id}/similar?api_key=${API_KEY}`);
      this.relatedMovies = response.data.results.slice(0, 10); // Get top 10 related movies
    } catch (error) {
      console.error('Error fetching related movies:', error);
    }
  }

  goToMovie(id: number) {
    this.router.navigate(['/movie', id]); 
  }
}
