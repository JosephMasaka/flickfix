import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { SearchTMDBComponent } from './app/components/shared/search-tmdb/search-tmdb.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
