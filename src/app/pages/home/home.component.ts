import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ShowcaseComponent } from '../../components/home/showcase/showcase.component';
import { LatestTvSeriesComponent } from '../../components/home/latest-tv-series/latest-tv-series.component';
import { Router } from '@angular/router'; // ✅ Import Router

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, HttpClientModule, ShowcaseComponent, LatestTvSeriesComponent],
})
export class HomeComponent implements OnInit {
  movieService = inject(MovieService);
  router = inject(Router); // ✅ Inject Router properly

  ngOnInit() {
    this.movieService.fetchTrendingMovies();
  }

  goToMovie(id: number) {
    this.router.navigate(['/movie', id]); 
  }
}
