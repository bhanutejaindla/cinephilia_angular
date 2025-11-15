import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ShowTime {
  showId: string;        // unique id per movie+cinema+date+time+class
  cinema: string;
  location: string;
  studio: string;        // REGULAR 2D, GOLD CLASS 2D, etc.
  classLabel: string;
  price: number;
  time: string;          // "14:40"
  date: string;          // ISO date like "2025-12-16"
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  // simple static dataset for demo — in real app fetch from API
  private shows: ShowTime[] = [];

  constructor() {
    this.seedShows();
  }

  private seedShows() {
    // create 3 days of shows for two cinemas for demonstration
    const movieIds = ['m1','m2','m3']; // reuse movie ids from movie.service
    const locations = ['Jakarta','Mumbai'];
    const cinemas = ['GRAND INDONESIA CGV','MANGGA DUA SQUARE CINEPOLIS'];
    const studios = [
      { label: 'REGULAR 2D', price: 45000 },
      { label: 'GOLD CLASS 2D', price: 80000 },
      { label: 'VELVET 2D', price: 120000 }
    ];

    const baseDates = [
      new Date(), 
      new Date(Date.now() + 24*60*60*1000),
      new Date(Date.now() + 2*24*60*60*1000)
    ];

    const times = ['11:00','14:40','17:30','20:00'];

    let counter = 1;
    for (const movieId of movieIds) {
      for (const dt of baseDates) {
        const iso = dt.toISOString().slice(0,10);
        for (const loc of locations) {
          for (const cin of cinemas) {
            for (const s of studios) {
              for (const t of times) {
                this.shows.push({
                  showId: `show_${movieId}_${counter}`,
                  cinema: cin,
                  location: loc,
                  studio: s.label,
                  classLabel: s.label,
                  price: s.price,
                  time: t,
                  date: iso
                });
                counter++;
              }
            }
          }
        }
      }
    }
  }

  // get all unique dates for a movie (mock returns the three seed dates)
  getDatesForMovie(movieId: string): Observable<string[]> {
    const dates = Array.from(new Set(this.shows.map(s => s.date)));
    return of(dates);
  }

  // get all shows for a given movie + date + location (if provided)
  getShows(movieId: string, date: string, location?: string): Observable<ShowTime[]> {
    // In this mock we ignore movieId (shows are not tied to movieId in sample seed),
    // but in a real implementation we would filter by movieId
    let arr = this.shows.filter(s => s.date === date);
    if (location) arr = arr.filter(s => s.location === location);
    return of(arr);
  }

  // get show by id
  getShowById(showId: string): Observable<ShowTime | undefined> {
    return of(this.shows.find(s => s.showId === showId));
  }
}
