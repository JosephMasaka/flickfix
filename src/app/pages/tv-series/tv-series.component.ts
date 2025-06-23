import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // ✅ Add this
import { Router } from '@angular/router';

@Component({
    selector: 'app-tv-series',
    imports: [CommonModule,
        // TODO: `HttpClientModule` should not be imported into a component directly.
        // Please refactor the code to add `provideHttpClient()` call to the provider list in the
        // application bootstrap logic and remove the `HttpClientModule` import from this component.
        // TODO: `HttpClientModule` should not be imported into a component directly.
        // Please refactor the code to add `provideHttpClient()` call to the provider list in the
        // application bootstrap logic and remove the `HttpClientModule` import from this component.
        HttpClientModule], // ✅ Include HttpClientModule here
    templateUrl: './tv-series.component.html',
    styleUrl: './tv-series.component.scss'
})
export class TvSeriesComponent {
  seriesId!: number;
  tvSeries: any;
  relatedTvSeries: any;
  isLoading: boolean = true;
  isLoadingRelated: boolean = true;
  API_KEY: string = 'eeb61bdc3a426b35a6564e7cfce2e1bd';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  router = inject(Router);

  // ngOnInit() {
  //   this.seriesId = Number(this.route.snapshot.paramMap.get('seriesId')); // ✅ Corrected param name
  //   this.fetchTvSeriesDetails();
  //   this.fetchRelatedTvSeries();
  // }

  fetchTvSeriesDetails() {
    const url = `https://api.themoviedb.org/3/tv/${this.seriesId}?api_key=${this.API_KEY}&language=en-US`;
    this.http.get<any>(url).subscribe({
      next: (data) => {
        // console.log(data);
        this.tvSeries = data;
        this.fetchRelatedTvSeries();
        this.isLoading = false;
      },
      error: () => {
        console.error('Failed to load series details');
        this.isLoading = false;
      }
    });
  }

  fetchRelatedTvSeries() {
    if (!this.tvSeries || !this.tvSeries.genres) return;

    const genreId = this.tvSeries.genres[0]?.id; // Get first genre
    if (!genreId) return;

    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${this.API_KEY}&with_genres=${genreId}&language=en-US`;
    
    this.http.get<any>(url).subscribe({
      next: (data) => {
        console.log(data);
        this.relatedTvSeries = data.results.filter((series: any) => series.id !== this.seriesId);
        this.isLoadingRelated = false;
      },
      error: () => {
        console.error('Failed to load related series');
        this.isLoadingRelated = false;
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.seriesId = Number(params.get('seriesId')); // ✅ Assign the ID first
      if (this.seriesId) {
        this.fetchTvSeriesDetails();
      }
    });
  }
  

  // ✅ Function to navigate to TV Series Details Page
  goToTvSeriesDetails(seriesId: number) {
    this.router.navigate(['/tv-series', seriesId]);

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get formattedGenres(): string {
    return this.tvSeries?.genres?.map((g: any) => g.name).join(', ') || 'N/A';
  }
}
