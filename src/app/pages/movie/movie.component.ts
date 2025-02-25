import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { CommonModule } from '@angular/common';

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
  movie: any = null;
  relatedMovies: any[] = [];
  isLoading: boolean = true;
  isLoadingRelated: boolean = true;
  route = inject(ActivatedRoute);
  router = inject(Router); // Inject Router to navigate programmatically

  async fetchMovieDetails(id: string) {
    this.isLoading = true;
    try {
      const response = await axios.get(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
      this.movie = response.data;
      await this.fetchRelatedMovies(id);
      this.isLoading = false;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }

  async fetchRelatedMovies(id: string) {
    try {
      const genreId = this.movie.genres[0].id;
      // const response = await axios.get(`${API_URL}/movie/${id}/similar?api_key=${API_KEY}`);
      const response = await axios.get(`${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
      this.relatedMovies = response.data.results || [];
      this.isLoadingRelated = false;
    } catch (error) {
      console.error('Error fetching related movies:', error);
      this.isLoadingRelated = false;
    } finally {
      this.isLoadingRelated = false;
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const movieId = params.get('id');
      if (movieId) {
        this.fetchMovieDetails(movieId);
        this.fetchRelatedMovies(movieId);
      }
    });
  }

  goToMovie(movieId: number) {
    this.router.navigate(['/movie', movieId]); // Navigate to selected movie

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
