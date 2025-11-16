import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService } from '../../core/booking.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-payment-confirmation',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent {

  booking: any = null;

  /** See-all toggle */
  showMethods: boolean = false;

  /** Payment list */
  paymentMethods = [
    'Credit Card',
    'Debit Card',
    'Cash',
    'UPI',
    'Wallet'
  ];

  selectedPayment: string | null = null;

  serviceFee = 5000;
  promoDiscount = 0;

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.booking = this.bookingService.getBooking();

    // Validate booking
    if (!this.booking?.show || !this.booking.selectedSeats?.length) {
      this.router.navigate(['/home']);
      return;
    }
  }

  /** Auto calculate total */
  get totalPay() {
    return this.booking.total + this.serviceFee - this.promoDiscount;
  }

  /** Toggle SEE ALL list */
  togglePaymentMethods() {
    this.showMethods = !this.showMethods;
  }

  /** Select payment method */
  choosePayment(method: string) {
    this.selectedPayment = method;
  }

  /** Back button */
  goBack() {
    this.router.navigate(['/seats', this.booking.movieId]);
  }

  /** Confirm and save booking */
  confirmPayment() {

    if (!this.selectedPayment) {
      alert("Please choose a payment method");
      return;
    }

    const finalBooking = {
      id: Date.now(),
      movieId: this.booking.movieId,
      movieTitle: this.booking.movieTitle,
      poster: this.booking.poster,
      seats: this.booking.selectedSeats,
      show: this.booking.show,
      total: this.totalPay,
      paymentMethod: this.selectedPayment,
      status: "CONFIRMED",
      date: new Date().toISOString()
    };

    this.bookingService.addBooking(finalBooking);
    this.bookingService.clearCurrent();

    this.router.navigate(['/payment-success'], {
      state: { id: finalBooking.id }
    });
  }
}
