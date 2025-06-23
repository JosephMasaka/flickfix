import { Component, HostListener } from '@angular/core';
import { SearchTMDBComponent } from '../search-tmdb/search-tmdb.component';

@Component({
    selector: 'app-navbar',
    imports: [SearchTMDBComponent],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if(window.scrollY > 0) {
      document.querySelector('.nav-custom')?.classList.add('bg-white');
      document.querySelector('.nav-custom')?.classList.remove('bg-transparent');
    } else {
      document.querySelector('.nav-custom')?.classList.remove('bg-white');
      document.querySelector('.nav-custom')?.classList.add('bg-transparent');
    }
  }
}
