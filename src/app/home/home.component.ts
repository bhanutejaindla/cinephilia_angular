import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../core/movie.service';
import { MovieCardComponent } from '../shared/movie-card/movie-card.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieCardComponent,NavbarComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  nowShowing: any[] = [];
  spotlight: any[] = [];
  comingSoon: any[] = [];
  filtered: any[] = [];

  searchTerm = '';

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.movieService.getNowShowing().subscribe(d => this.nowShowing = d);
    this.movieService.getSpotlight().subscribe(d => this.spotlight = d);
    this.movieService.getComingSoon().subscribe(d => this.comingSoon = d);
  }

  searchMovies() {
    if (!this.searchTerm.trim()) {
      this.filtered = [];
      return;
    }
    this.movieService.search(this.searchTerm).subscribe(d => this.filtered = d);
  }

  openMovie(movie: any) {
    this.router.navigate(['/schedule', movie.id]);
  }
}
