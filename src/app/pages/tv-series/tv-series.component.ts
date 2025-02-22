import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // ✅ Add this
import { Router } from '@angular/router';

@Component({
  selector: 'app-tv-series',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // ✅ Include HttpClientModule here
  templateUrl: './tv-series.component.html',
  styleUrl: './tv-series.component.scss'
})
export class TvSeriesComponent {
  seriesId!: number;
  tvSeries: any;
  relatedTvSeries: any;
  API_KEY: string = 'eeb61bdc3a426b35a6564e7cfce2e1bd';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  router = inject(Router);

  ngOnInit() {
    this.seriesId = Number(this.route.snapshot.paramMap.get('seriesId')); // ✅ Corrected param name
    this.fetchTvSeriesDetails();
    this.fetchRelatedTvSeries();
  }

  fetchTvSeriesDetails() {
    const url = `https://api.themoviedb.org/3/tv/${this.seriesId}?api_key=${this.API_KEY}&language=en-US`;
    this.http.get<any>(url).subscribe({
      next: (data) => {
        // console.log(data);
        this.tvSeries = data;
      },
      error: () => {
        console.error('Failed to load series details');
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
      },
      error: () => {
        console.error('Failed to load related series');
      }
    });
  }

  // ✅ Function to navigate to TV Series Details Page
  goToTvSeriesDetails(seriesId: number) {
    this.router.navigate(['/tv-series', seriesId]);
  }

  get formattedGenres(): string {
    return this.tvSeries?.genres?.map((g: any) => g.name).join(', ') || 'N/A';
  }
}
