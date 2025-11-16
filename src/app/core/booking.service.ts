import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookings: any[] = [];

  private currentBooking: any = {
    movieId: null,
    movieTitle: '',
    poster: '',
    show: null,
    selectedSeats: [],
    total: 0
  };

  constructor() {
    // Load saved history
    const saved = localStorage.getItem('bookings');
    if (saved) {
      this.bookings = JSON.parse(saved);
    }

    // Load temp booking
    const savedCurrent = localStorage.getItem('currentBooking');
    if (savedCurrent) {
      this.currentBooking = JSON.parse(savedCurrent);
    }
  }

  // -------------------------------------------------------------
  // 🔵 OLD METHODS (required by your components)
  // -------------------------------------------------------------

  setMovieId(id: any) {
    this.currentBooking.movieId = id;
    this.saveTemp();
  }

  // ⭐ REQUIRED by ScheduleComponent
  setMovieData(movie: any) {
    this.currentBooking.movieTitle = movie.title;
    this.currentBooking.poster = movie.poster;
    this.saveTemp();
  }

  setShow(show: any) {
    this.currentBooking.show = show;
    this.saveTemp();
  }

  setSeats(seats: any[]) {
    this.currentBooking.selectedSeats = seats;
    this.saveTemp();
  }

  setTotal(total: number) {
    this.currentBooking.total = total;
    this.saveTemp();
  }

  // -------------------------------------------------------------
  // 🔵 MERGES ANY EXTRA BOOKING DATA (future-proof function)
  // -------------------------------------------------------------
  setBooking(data: any) {
    this.currentBooking = { ...this.currentBooking, ...data };
    this.saveTemp();
  }

  // -------------------------------------------------------------
  // 🔵 RETURNS CURRENT BOOKING (used in payment pages)
  // -------------------------------------------------------------
  getBooking() {
    return this.currentBooking;
  }

  // -------------------------------------------------------------
  // 🔵 ADDS COMPLETED TICKET TO BOOKING HISTORY
  // -------------------------------------------------------------
  addBooking(booking: any) {
    this.bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(this.bookings));
  }

  // -------------------------------------------------------------
  // 🔵 GET ALL PREVIOUS TICKETS
  // -------------------------------------------------------------
  getAll() {
    return this.bookings;
  }

  // -------------------------------------------------------------
  // 🔵 CANCEL BOOKING LOGIC
  // -------------------------------------------------------------
  cancelBooking(id: number) {
    const b = this.bookings.find(x => x.id === id);
    if (b) {
      b.status = 'CANCELLED';
      localStorage.setItem('bookings', JSON.stringify(this.bookings));
    }
  }

  // -------------------------------------------------------------
  // 🔵 SAVE TEMP BOOKING INTO LOCAL STORAGE
  // -------------------------------------------------------------
  private saveTemp() {
    localStorage.setItem('currentBooking', JSON.stringify(this.currentBooking));
  }

  // -------------------------------------------------------------
  // 🔵 CLEAR TEMP BOOKING (optional after payment success)
  // -------------------------------------------------------------
  clearCurrent() {
    this.currentBooking = {
      movieId: null,
      movieTitle: '',
      poster: '',
      show: null,
      selectedSeats: [],
      total: 0
    };

    localStorage.setItem('currentBooking', JSON.stringify(this.currentBooking));
  }
}
