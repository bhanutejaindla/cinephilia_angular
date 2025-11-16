import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookings: any[] = [];
  private currentBooking: any = null;

  constructor() {
    const saved = localStorage.getItem('bookings');
    if (saved) {
      this.bookings = JSON.parse(saved);
    }
  }

  // Save selected show + seats before payment
  setBooking(data: any) {
    this.currentBooking = data;
    localStorage.setItem('currentBooking', JSON.stringify(data));
  }

  // Retrieve booking before payment
  getBooking() {
    if (this.currentBooking) return this.currentBooking;

    const stored = localStorage.getItem('currentBooking');
    return stored ? JSON.parse(stored) : null;
  }

  // FINAL Booking
  addBooking(booking: any) {
    this.bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(this.bookings));
  }

  // Get all booked & cancelled tickets
  getAll() {
    return this.bookings;
  }

  // Cancel a ticket
  cancelBooking(id: number) {
    const item = this.bookings.find(t => t.id === id);
    if (item) {
      item.status = 'CANCELLED';
      localStorage.setItem('bookings', JSON.stringify(this.bookings));
    }
  }
}
