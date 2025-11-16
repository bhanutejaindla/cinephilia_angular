import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../core/movie.service';
import { Movie } from '../core/movie.model';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {

  searchTerm = '';
  filtered: Movie[] = [];
  nowShowing: Movie[] = [];
  spotlight: Movie[] = [];
  comingSoon: Movie[] = [];

  autoScrollIntervals: any[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.movieService.getNowShowing().subscribe(list => this.nowShowing = list);
    this.movieService.getSpotlight().subscribe(list => this.spotlight = list);
    this.movieService.getComingSoon().subscribe(list => this.comingSoon = list);

    this.startAutoScroll('now');
    this.startAutoScroll('spot');
    this.startAutoScroll('soon');
  }

  searchMovies() {
    if (!this.searchTerm.trim()) {
      this.filtered = [];
      return;
    }
    this.movieService.search(this.searchTerm).subscribe(list => this.filtered = list);
  }

  openSchedule(movie: Movie) {
    this.router.navigate(['/schedule', movie.id]);
  }

  /** Auto-scroll carousel */
  startAutoScroll(id: string) {
    const interval = setInterval(() => {
      const el = document.getElementById(id);
      if (el) el.scrollBy({ left: 200, behavior: 'smooth' });
    }, 3000);
    this.autoScrollIntervals.push(interval);
  }

  /** Manual arrows */
  scrollLeft(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollBy({ left: -350, behavior: 'smooth' });
  }

  scrollRight(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollBy({ left: 350, behavior: 'smooth' });
  }

  /** Coming soon countdown */
  daysUntil(date: string | undefined): number {
    if (!date) return 0;
    const today = new Date();
    const release = new Date(date);
    const diff = release.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
  }

  ngOnDestroy() {
    this.autoScrollIntervals.forEach(i => clearInterval(i));
  }
}
