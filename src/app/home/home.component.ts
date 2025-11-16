import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../core/movie.service';
import { SectionService } from '../core/section.service';
import { Movie } from '../core/movie.model';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  movies: Movie[] = [];
  sections: any[] = [];

  nowShowing: Movie[] = [];
  spotlight: Movie[] = [];
  comingSoon: Movie[] = [];

  searchTerm = '';
  filtered: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private sectionService: SectionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.movieService.getAll().subscribe(movies => {
      this.movies = movies;

      this.sectionService.getSections().subscribe(sections => {
        this.sections = sections;

        this.mapSections();
      });
    });
  }

  mapSections() {
    const secNow = this.sections.find(s => s.name === 'Now Showing');
    const secSpot = this.sections.find(s => s.name === 'Spotlight');
    const secSoon = this.sections.find(s => s.name === 'Coming Soon');

    this.nowShowing = this.filter(secNow);
    this.spotlight = this.filter(secSpot);
    this.comingSoon = this.filter(secSoon);

    this.filtered = this.nowShowing;
  }

  filter(section: any): Movie[] {
    if (!section) return [];
    return this.movies.filter(m => section.movie_ids.includes(m.id));
  }

  searchMovies() {
    if (!this.searchTerm.trim()) {
      this.filtered = this.nowShowing;
      return;
    }

    const q = this.searchTerm.toLowerCase();
    this.filtered = this.movies.filter(m =>
      m.title.toLowerCase().includes(q)
    );
  }

  openSchedule(movie: Movie) {
    this.router.navigate(['/schedule', movie.id]);
  }
}
