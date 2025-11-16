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
    selectedDate: '',
    selectedTime: '',
    selectedCinema: '',
    selectedClass: '',
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
  // 🔵 OLD METHODS USED BY SCHEDULE & SEATS COMPONENTS
  // -------------------------------------------------------------

  setMovieId(id: any) {
    this.currentBooking.movieId = id;
    this.saveTemp();
  }

  setMovieData(movie: any) {
    this.currentBooking.movieTitle = movie.title;
    this.currentBooking.poster = movie.poster;
    this.saveTemp();
  }

  setShow(show: any) {
    this.currentBooking.show = show;

    // DECOMPOSE SHOW OBJECT → more readable
    this.currentBooking.selectedDate = show.date;
    this.currentBooking.selectedTime = show.time;
    this.currentBooking.selectedCinema = show.cinema;
    this.currentBooking.selectedClass = show.class;

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
  // 🔵 MERGE BOOKING DATA (optional advanced usage)
  // -------------------------------------------------------------
  setBooking(data: any) {
    this.currentBooking = { ...this.currentBooking, ...data };
    this.saveTemp();
  }

  // -------------------------------------------------------------
  // 🔵 RETRIEVE TEMP BOOKING (payment-confirmation uses this)
  // -------------------------------------------------------------
  getBooking() {
    return this.currentBooking;
  }

  // -------------------------------------------------------------
  // 🔵 ADD FINAL BOOKING TO HISTORY
  // -------------------------------------------------------------
  addBooking(booking: any) {
    this.bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(this.bookings));
  }

  // -------------------------------------------------------------
  // 🔵 GET ALL BOOKINGS (History + Active Tickets)
  // -------------------------------------------------------------
  getAll() {
    return this.bookings;
  }

  // -------------------------------------------------------------
  // 🔵 CANCEL BOOKING
  // -------------------------------------------------------------
  cancelBooking(id: number) {
    const b = this.bookings.find(x => x.id === id);
    if (b) {
      b.status = 'CANCELLED';
      localStorage.setItem('bookings', JSON.stringify(this.bookings));
    }
  }

  // -------------------------------------------------------------
  // 🔵 SAVE TEMP BOOKING TO LOCAL STORAGE
  // -------------------------------------------------------------
  private saveTemp() {
    localStorage.setItem('currentBooking', JSON.stringify(this.currentBooking));
  }

  // -------------------------------------------------------------
  // 🔵 CLEAR TEMP BOOKING AFTER PAYMENT SUCCESS
  // -------------------------------------------------------------
  clearCurrent() {
    this.currentBooking = {
      movieId: null,
      movieTitle: '',
      poster: '',
      selectedDate: '',
      selectedTime: '',
      selectedCinema: '',
      selectedClass: '',
      show: null,
      selectedSeats: [],
      total: 0
    };

    localStorage.setItem('currentBooking', JSON.stringify(this.currentBooking));
  }
}
