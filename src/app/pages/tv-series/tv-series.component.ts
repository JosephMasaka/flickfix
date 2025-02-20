import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tv-series',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-series.component.html',
  styleUrl: './tv-series.component.scss'
})
export class TvSeriesComponent {
  seriesId!: number;
  tvSeries: any;
  API_KEY: string = 'eeb61bdc3a426b35a6564e7cfce2e1bd';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.seriesId = Number(this.route.snapshot.paramMap.get('id')); // Get ID from URL
    this.fetchTvSeriesDetails();
  }

  fetchTvSeriesDetails() {
    const url = `https://api.themoviedb.org/3/tv/${this.seriesId}?api_key=${this.API_KEY}&language=en-US`;
    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.tvSeries = data;
      },
      error: () => {
        console.error('Failed to load series details');
      }
    });
  }
}
