import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ✅ Import Router

@Component({
  selector: 'app-latest-tv-series',
  standalone: true,
  templateUrl: './latest-tv-series.component.html',
  styleUrls: ['./latest-tv-series.component.scss'],
  imports: [CommonModule],
})
export class LatestTvSeriesComponent implements OnInit {
  latestSeries: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  API_KEY: string = 'eeb61bdc3a426b35a6564e7cfce2e1bd';

  constructor(private http: HttpClient, private router: Router) {}  // ✅ Inject Router

  ngOnInit() {
    this.fetchLatestTVSeries();
  }

  fetchLatestTVSeries() {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${this.API_KEY}&language=en-US&page=1`;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        console.log(data);
        this.latestSeries = data.results;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load TV series';
        this.loading = false;
      }
    });
  }

  // ✅ Function to navigate to TV Series Details Page
  goToTvSeriesDetails(seriesId: number) {
    this.router.navigate(['tv-series/', seriesId]);
  }
}
