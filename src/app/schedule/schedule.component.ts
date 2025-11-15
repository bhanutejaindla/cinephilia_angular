import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleService, ShowTime } from '../core/schedule.service';
import { MovieService } from '../core/movie.service';
import { BookingService } from '../core/booking.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from '../core/movie.model';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';


@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent,FooterComponent],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {

  movieId = '';
  dates: string[] = [];
  selectedDate = '';
  locations: string[] = ['Jakarta','Mumbai'];
  selectedLocation = 'Jakarta';
  shows: ShowTime[] = [];
  groupedByCinema: { cinema: string, shows: ShowTime[] }[] = [];
  selectedShow?: ShowTime;

  // simple movie snapshot
  movie: any = null;

  constructor(
    private scheduleService: ScheduleService,
    private movieService: MovieService,
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // movie id may come from route params or booking service
    this.route.paramMap.subscribe(pm => {
      const id = pm.get('id');
      if (id) {
        this.movieId = id;
        this.bookingService.setMovieId(id);
      }
      this.loadDates();
      this.loadMovie();
    });
  }

  loadMovie() {
    // simple call — movie service in Milestone 2 holds movies
    this.movieService.getAll().subscribe((list: Movie[]) => {
  const found = list.find((m: Movie) => m.id === this.movieId);
  this.movie = found || list[0];
});

  }

  loadDates() {
    this.scheduleService.getDatesForMovie(this.movieId).subscribe(d => {
      this.dates = d;
      if (d.length) {
        this.selectedDate = d[0];
        this.loadShows();
      }
    });
  }

  loadShows() {
    this.scheduleService.getShows(this.movieId, this.selectedDate, this.selectedLocation).subscribe(s => {
      this.shows = s;
      this.groupByCinema();
    });
  }

  groupByCinema() {
    const map = new Map<string, ShowTime[]>();
    for (const s of this.shows) {
      if (!map.has(s.cinema)) map.set(s.cinema, []);
      map.get(s.cinema)!.push(s);
    }
    this.groupedByCinema = Array.from(map.entries()).map(([cinema, shows]) => ({ cinema, shows }));
  }

  selectShow(s: ShowTime) {
    this.selectedShow = s;
    this.bookingService.setShow(s);
  }

  bookNow() {
    if (!this.selectedShow) return alert('Please select a showtime first');
    // navigate to seats page with showId
    this.router.navigate(['/seats', this.selectedShow.showId]);
  }

  onDateChange(d: string) {
    this.selectedDate = d;
    this.loadShows();
  }

  onLocationChange(loc: string) {
    this.selectedLocation = loc;
    this.loadShows();
  }
}
