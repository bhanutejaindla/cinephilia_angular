import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ScheduleService } from '../core/schedule.service';
import { ShowTime } from '../core/showtime.model';
import { MovieService } from '../core/movie.service';
import { BookingService } from '../core/booking.service';

import { Movie } from '../core/movie.model';

import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';



@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {

  movieId = '';
  movie: Movie | null = null;

  dates: string[] = [];
  selectedDate = '';

  locations: string[] = ['Jakarta', 'Mumbai'];
  selectedLocation = 'Jakarta';

  shows: ShowTime[] = [];
  groupedByCinema: { cinema: string, shows: ShowTime[] }[] = [];

  selectedShow: any = null;

  constructor(
    private scheduleService: ScheduleService,
    private movieService: MovieService,
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(pm => {
      const id = pm.get('id');

      if (id) {
        this.movieId = id;
        this.bookingService.setMovieId(id);
      }

      this.loadMovie();
      this.loadDates();
    });
  }

  // --------------------------
  // Load Movie details (title, poster, etc.)
  // --------------------------
  loadMovie() {
    this.movieService.getAll().subscribe((list: Movie[]) => {
      const found = list.find(m => m.id === this.movieId);
      this.movie = found || null;

      if (this.movie) {
        this.bookingService.setMovieData(this.movie);
      }
    });
  }

  // --------------------------
  // Load available dates
  // --------------------------
  loadDates() {
    this.scheduleService.getDatesForMovie(this.movieId).subscribe(d => {
      this.dates = d;
      if (d.length > 0) {
        this.selectedDate = d[0];
        this.loadShows();
      }
    });
  }

  // --------------------------
  // Load shows for selected date/location
  // --------------------------
  loadShows() {
    this.scheduleService.getShows(this.movieId, this.selectedDate, this.selectedLocation)
      .subscribe(s => {
        this.shows = s;
        this.groupByCinema();
      });
  }

  // --------------------------
  // Group showtimes by cinema
  // --------------------------
  groupByCinema() {
    const map = new Map<string, ShowTime[]>();

    this.shows.forEach(s => {
      if (!map.has(s.cinema)) {
        map.set(s.cinema, []);
      }
      map.get(s.cinema)!.push(s);
    });

    this.groupedByCinema = Array.from(map.entries()).map(([cinema, shows]) => ({
      cinema,
      shows
    }));
  }

  // --------------------------
  // Select showtime
  // --------------------------
  selectShow(s: ShowTime) {

  if (!this.movie) return;

  this.selectedShow = {
    showId: s.showId,
    movieId: this.movie.id,
    movieTitle: this.movie.title,
    poster: this.movie.image,

    // cinema info
    cinema: s.cinema,
    location: s.location,
    studio: s.studio,
    class: s.classLabel,

    // price & timing
    price: s.price,
    date: this.selectedDate,
    time: s.time
  };

  // Save into booking service
  this.bookingService.setShow(this.selectedShow);
  this.bookingService.setMovieData(this.movie);
}


  // --------------------------
  // Proceed to seats
  // --------------------------
  bookNow() {
    if (!this.selectedShow) {
      alert('Please select a showtime first');
      return;
    }

    this.router.navigate(['/seats', this.selectedShow.showId]);
  }

  // --------------------------
  // Date change
  // --------------------------
  onDateChange(d: string) {
    this.selectedDate = d;
    this.loadShows();
  }

  // --------------------------
  // Location Change
  // --------------------------
  onLocationChange(loc: string) {
    this.selectedLocation = loc;
    this.loadShows();
  }
}
