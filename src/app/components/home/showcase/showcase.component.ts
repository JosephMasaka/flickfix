import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-showcase',
  standalone: true,
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
  imports: [CommonModule, SlickCarouselModule],
})
export class ShowcaseComponent implements OnInit {
  movies: any[] = [];
  apiKey = 'eeb61bdc3a426b35a6564e7cfce2e1bd';  // Replace with your TMDB API key
  apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1`;

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: true,
    infinite: true
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies() {
    this.http.get<any>(this.apiUrl).subscribe(response => {
      // console.log(response);
      this.movies = response.results.map((movie: any) => ({
        title: movie.title,
        image: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,  // Using backdrop for a full-width background
        releaseDate: movie.release_date,
        rating: movie.vote_average.toFixed(1), // Rounds rating to 1 decimal place
        popularity: movie.popularity,
        overview: movie.overview
      }));
    });
  }  
}
