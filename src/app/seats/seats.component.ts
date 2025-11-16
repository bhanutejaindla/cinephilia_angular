import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatService, Seat } from '../core/seat.service';
import { BookingService } from '../core/booking.service';
import { Router } from '@angular/router';
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

  schedule: any = null;
  movie: any = null;

  rows: { row: string; seats: Seat[] }[] = [];

  selectedSeats: string[] = [];
  pricePerSeat = 0;

  constructor(
    private seatService: SeatService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit() {
    const nav = history.state;

    if (!nav.schedule || !nav.movie) {
      this.router.navigate(['/home']);
      return;
    }

    this.schedule = nav.schedule;
    this.movie = nav.movie;

    this.pricePerSeat = this.schedule.price || 150000;

    this.loadSeats();

    this.bookingService.setBooking({
      movieId: this.movie.id,
      movieTitle: this.movie.title,
      poster: this.movie.image,
      show: this.schedule,
      selectedSeats: [],
      total: 0
    });
  }

  loadSeats() {
    const flat = this.seatService.getLayoutForShow(this.schedule.time);
    const rowMap: Record<string, Seat[]> = {};

    flat.forEach(seat => {
      if (!rowMap[seat.row]) rowMap[seat.row] = [];
      rowMap[seat.row].push(seat);
    });

    this.rows = Object.keys(rowMap).map(r => ({
      row: r,
      seats: rowMap[r]
    }));
  }

  isBooked(s: Seat) { return s.status === 'booked'; }
  isSelected(id: string) { return this.selectedSeats.includes(id); }

  toggleSeat(s: Seat) {
    if (s.status === 'booked') return;

    if (this.isSelected(s.id)) {
      this.selectedSeats = this.selectedSeats.filter(x => x !== s.id);
    } else {
      this.selectedSeats.push(s.id);
    }

    this.bookingService.setSeats(this.selectedSeats);
    this.bookingService.setTotal(this.selectedSeats.length * this.pricePerSeat);
  }

  returnBack() {
    this.router.navigate(['/schedule', this.movie.id]);
  }

  confirm() {
    if (!this.selectedSeats.length) {
      alert('Select at least 1 seat');
      return;
    }

    this.seatService.bookSeats(this.schedule.time, this.selectedSeats);

    this.router.navigate(['/payment-confirmation']);
  }
}
