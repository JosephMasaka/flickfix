import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TmdbService } from '../../../services/search/search-tmdb.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';

@Component({
    selector: 'app-search-tmdb',
    imports: [ReactiveFormsModule, CommonModule,
        // TODO: `HttpClientModule` should not be imported into a component directly.
        // Please refactor the code to add `provideHttpClient()` call to the provider list in the
        // application bootstrap logic and remove the `HttpClientModule` import from this component.
        // TODO: `HttpClientModule` should not be imported into a component directly.
        // Please refactor the code to add `provideHttpClient()` call to the provider list in the
        // application bootstrap logic and remove the `HttpClientModule` import from this component.
        HttpClientModule, RouterLink],
    templateUrl: './search-tmdb.component.html',
    styleUrl: './search-tmdb.component.scss'
})
export class SearchTMDBComponent implements OnInit {
  searchControl = new FormControl();
  results: any[] = [];
  showResults = false;

  router = inject(Router);

  constructor(private http: HttpClient, private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),  // Wait 500ms before making an API request
        distinctUntilChanged(), // Only fetch if input has changed
        switchMap(query => {
          const trimmedQuery = query?.trim(); // Ensure no unnecessary calls
          this.showResults = !!trimmedQuery; // Show results box only if query exists
          return trimmedQuery ? this.tmdbService.searchMoviesAndTV(trimmedQuery) : [];
        })
      )
      .subscribe(results => {
        this.results = results;
        this.showResults = results.length > 0; // Hide results if empty
      });
  }

  onBlur() {
    // Delay hiding to allow clicking on results
    setTimeout(() => {
      this.showResults = false;
    }, 200);
  }

  onFocus() {
    // Show results again if there are existing results
    if (this.results.length > 0) {
      this.showResults = true;
    }
  }

  viewDetails(item: any) {
    const type = item.title ? 'movie' : 'tv'; // Determine type based on title presence
    this.router.navigate([`/${type}/${item.id}`]); // Navigate to the details page
    this.showResults = false; // Hide results after selection
  }
}
