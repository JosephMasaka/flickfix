import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie/movie.service';
import axios from 'axios';
import { CommonModule } from '@angular/common';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'eeb61bdc3a426b35a6564e7cfce2e1bd';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  template: `
    <div *ngIf="movie" class="container mx-auto p-5">
      <img [src]="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Movie Poster">
      <h1 class="text-3xl font-bold">{{ movie.title }}</h1>
      <p class="mt-3">{{ movie.overview }}</p>
    </div>
  `,
  styles: [``],
  imports: [CommonModule]
})
export class MovieComponent implements OnInit {
  movie: any = null;
  route = inject(ActivatedRoute);

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const response = await axios.get(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
    this.movie = response.data;
  }
}
