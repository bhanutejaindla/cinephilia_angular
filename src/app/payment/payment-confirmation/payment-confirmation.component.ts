import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../core/booking.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-payment-confirmation',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent {

  booking: any;
  selectedPayment: string = '';
  showPopup: boolean = false;

  paymentOptions = ['Credit Card', 'Debit Card', 'Cash', 'UPI', 'Wallet'];

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.booking = this.bookingService.getBooking();

    if (!this.booking?.selectedSeats?.length) {
      this.router.navigate(['/home']);
    }
  }

  openPaymentPopup() {
    this.showPopup = true;
  }

  choosePayment(method: string) {
    this.selectedPayment = method;
    this.showPopup = false;
  }

  buyTickets() {
    if (!this.selectedPayment) return;

    const finalBooking = {
      id: Date.now(),
      title: this.booking.movieTitle,
      date: this.booking.selectedDate,
      time: this.booking.selectedTime,
      cinema: this.booking.selectedCinema,
      class: this.booking.selectedClass,
      seats: this.booking.selectedSeats.join(", "),
      poster: this.booking.poster,
      total: this.booking.total + 2000,
      paymentMethod: this.selectedPayment,
      status: "BOOKED"
    };

    this.bookingService.addBooking(finalBooking);

    setTimeout(() => {
      this.router.navigate(['/payment-success']);
    }, 300);
  }

}
