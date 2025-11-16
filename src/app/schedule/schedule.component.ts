import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheatreService } from '../core/theatre.service';
import { MovieService } from '../core/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {

  movieId: any;
  movie: any;
  theatres: any[] = [];
  dates: any[] = [];
  selectedDate = '';
  selectedShowtime: any = null;

  constructor(
    private theatreService: TheatreService,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id');

    // Load movie details
    this.movieService.getById(this.movieId).subscribe(m => {
      this.movie = m;
    });

    // Load theatres
    this.theatreService.getTheatres().subscribe(t => {
      this.theatres = t;
    });

    this.generateDates();
  }

  generateDates() {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      this.dates.push({
        label: d.toLocaleDateString('en-US', {
          weekday: 'short',
          day: 'numeric',
          month: 'short'
        }),
        full: d.toISOString().split('T')[0]
      });
    }

    this.selectedDate = this.dates[0].full;
  }

  selectShowtime(theatre: any, show: any, time: string) {
    this.selectedShowtime = {
      theatre: theatre.name,
      type: show.type,
      time,
      date: this.selectedDate,
      price: show.price_min || show.price
    };
  }

  // ⭐ Correct seat redirection
  bookNow() {
    if (!this.selectedShowtime) return;

    this.router.navigate(['/seats', this.movieId], {
      state: {
        schedule: this.selectedShowtime,
        movie: this.movie
      }
    });
  }
}
