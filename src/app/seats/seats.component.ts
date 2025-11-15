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
  imports: [CommonModule,NavbarComponent,FooterComponent],
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent {

  showId = '';
  seats: any[] = [];
  selected: string[] = [];
  pricePerSeat = 0;
  booking: any = null;

  constructor(
    private seatService: SeatService,
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(pm => {
  const id = pm.get('id');

  if (!id) {
    this.router.navigate(['/home']);
    return;
  }

  this.showId = id;
  this.booking = this.bookingService.getBooking();
  this.pricePerSeat = this.booking?.show?.price || 150000;
  this.loadSeats();
});

  }

  loadSeats() {
    this.seats = this.seatService.getLayoutForShow(this.showId);
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
    this.bookingService.setSeats(this.selected);
    this.updateTotal();
  }

  updateTotal() {
    const total = this.selected.length * this.pricePerSeat;
    this.bookingService.setTotal(total);
  }

  returnBack() {
    // navigate back to schedule to change show
    this.router.navigate(['/schedule', this.booking?.movieId || '']);
  }

  confirm() {
    if (!this.selected.length) {
      alert('Select at least 1 seat');
      return;
    }

    // save seats
    this.seatService.bookSeats(this.showId, this.selected);

    // update booking summary
    this.bookingService.setSeats(this.selected);
    this.bookingService.setTotal(this.selected.length * this.pricePerSeat);

    // redirect to payment confirmation
    this.router.navigate(['/payment-confirmation']);
}
}
