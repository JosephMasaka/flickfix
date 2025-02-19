import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ShowcaseComponent } from '../../components/home/showcase/showcase.component'

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss', 
  imports: [CommonModule, HttpClientModule, ShowcaseComponent]
})
export class HomeComponent implements OnInit {
  movieService = inject(MovieService);

  ngOnInit() {
    this.movieService.fetchTrendingMovies();
  }

  goToMovie(id: number) {
    window.location.href = `/movie/${id}`;
  }
}
