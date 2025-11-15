import { Injectable } from '@angular/core';
import { ScheduleService, ShowTime } from './schedule.service';

export interface Booking {
  movieId?: string;
  show?: ShowTime;
  selectedSeats?: string[]; // seat ids
  total?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private current: Booking = {};

  setMovieId(id: string) { this.current.movieId = id; }
  setShow(show: ShowTime) { this.current.show = show; }
  setSeats(seats: string[]) { this.current.selectedSeats = seats; }
  setTotal(total: number) { this.current.total = total || 0 }

  getBooking(): Booking { return this.current; }

  clear() { this.current = {}; }
}
