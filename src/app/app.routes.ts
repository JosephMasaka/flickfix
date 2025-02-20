import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { TvSeriesComponent } from './pages/tv-series/tv-series.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'tv-series/:id', component: TvSeriesComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' } // Redirect unknown paths
];
