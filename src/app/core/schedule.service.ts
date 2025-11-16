import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShowTime } from './showtime.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor() {}

  /** Fake dates */
  getDatesForMovie(movieId: string): Observable<string[]> {
    return of([
      "2025-12-14",
      "2025-12-15",
      "2025-12-16"
    ]);
  }

  /** Fake shows */
  getShows(movieId: string, date: string, location: string): Observable<ShowTime[]> {
    const sample: ShowTime[] = [
      {
        showId: "show_001",
        cinema: "Grand Indonesia CGV",
        location: "Jakarta",
        studio: "REGULAR 2D",
        classLabel: "Regular",
        price: 50000,
        time: "14:40",
        date
      },
      {
        showId: "show_002",
        cinema: "Grand Indonesia CGV",
        location: "Jakarta",
        studio: "GOLD CLASS 2D",
        classLabel: "Gold",
        price: 80000,
        time: "18:10",
        date
      }
    ];

    return of(sample);
  }
}
