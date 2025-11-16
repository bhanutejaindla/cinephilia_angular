import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatService } from '../core/seat.service';
import { BookingService } from '../core/booking.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-seats',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent {

  movieId = '';
  schedule: any = null;
  movie: any = null;

  seats: any[] = [];
  selected: string[] = [];
  pricePerSeat = 0;

  constructor(
    private seatService: SeatService,
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    // 1️⃣ Read movie ID from URL
    this.movieId = this.route.snapshot.paramMap.get('id') || '';

    // 2️⃣ Read schedule + movie from navigation state
    const data = history.state;

    if (!data || !data.schedule || !data.movie) {
      this.router.navigate(['/home']);
      return;
    }

    this.schedule = data.schedule;
    this.movie = data.movie;

    this.pricePerSeat = this.schedule.price;

    // 3️⃣ Load seats for this show
    this.seats = this.seatService.getLayoutForShow(this.schedule.time);
  }

  isBooked(s: any) { return s.status === 'booked'; }
  isSelected(id: string) { return this.selected.includes(id); }

  toggleSeat(s: any) {
    if (s.status === 'booked') return;

    if (this.isSelected(s.id)) {
      this.selected = this.selected.filter(x => x !== s.id);
    } else {
      this.selected.push(s.id);
    }

    const total = this.selected.length * this.pricePerSeat;
    this.bookingService.setSeats(this.selected);
    this.bookingService.setTotal(total);
  }

  returnBack() {
    this.router.navigate(['/schedule', this.movieId]);
  }

  confirm() {
    if (!this.selected.length) {
      alert('Select at least 1 seat');
      return;
    }

    this.seatService.bookSeats(this.schedule.time, this.selected);

    this.router.navigate(['/payment-confirmation'], {
      state: {
        schedule: this.schedule,
        movie: this.movie,
        seats: this.selected,
        total: this.selected.length * this.pricePerSeat
      }
    });
  }
}
