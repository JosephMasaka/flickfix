import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
import { ShowcaseComponent } from '../../components/home/showcase/showcase.component';
import { LatestTvSeriesComponent } from '../../components/home/latest-tv-series/latest-tv-series.component';
import { Router } from '@angular/router'; // ✅ Import Router
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule,
        // TODO: `HttpClientModule` should not be imported into a component directly.
        // Please refactor the code to add `provideHttpClient()` call to the provider list in the
        // application bootstrap logic and remove the `HttpClientModule` import from this component.
        ShowcaseComponent, LatestTvSeriesComponent]
})
export class HomeComponent implements OnInit {
  movieService = inject(MovieService);
  router = inject(Router); // ✅ Inject Router properly

  ngOnInit() {
    this.movieService.fetchTrendingMovies();
  }

  goToMovie(id: number) {
    this.router.navigate(['/movie', id]); 

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
