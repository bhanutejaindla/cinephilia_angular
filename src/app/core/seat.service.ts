import { Injectable } from '@angular/core';

export interface Seat {
  id: string;        // e.g., "A1", "C9"
  row: string;       // "A", "B", ...
  number: number;
  status: 'available' | 'booked';
  price?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor() {}

  // generate a simple layout per show (8 rows x 10 seats)
  getLayoutForShow(showId: string): Seat[] {
    const rows = ['A','B','C','D','E','F','G','H'];
    const seats: Seat[] = [];
    for (const r of rows) {
      for (let n = 1; n <= 10; n++) {
        seats.push({ id: `${r}${n}`, row: r, number: n, status: 'available' });
      }
    }
    // mark some seats as booked using saved bookings in localStorage
    const booked = this.getBookedSeats(showId);
    for (const s of seats) {
      if (booked.includes(s.id)) s.status = 'booked';
    }
    return seats;
  }

  // read booked seats from localStorage (keyed by showId)
  getBookedSeats(showId: string): string[] {
    const map = JSON.parse(localStorage.getItem('bookedSeats') || '{}');
    return map[showId] || [];
  }

  // book seats (append)
  bookSeats(showId: string, seatsToBook: string[]) {
    const map = JSON.parse(localStorage.getItem('bookedSeats') || '{}');
    map[showId] = Array.from(new Set([...(map[showId] || []), ...seatsToBook]));
    localStorage.setItem('bookedSeats', JSON.stringify(map));
  }
}
