import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie.model';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // ✔ Correct path (you confirmed this works)
  private dataUrl = 'assets/data/movies.json';

  private movies$?: Observable<Movie[]>;

  constructor(private http: HttpClient) {}

  /** Load movies only once */
  private loadAll(): Observable<Movie[]> {
    if (!this.movies$) {
      this.movies$ = this.http.get<Movie[]>(this.dataUrl).pipe(
        shareReplay(1)   // cache the response
      );
    }
    return this.movies$;
  }

  /** Get full list of movies */
  getAll(): Observable<Movie[]> {
    return this.loadAll();
  }

  /** Get movie by ID */
  getById(id: string): Observable<Movie | undefined> {
    return this.loadAll().pipe(
      map(movies => movies.find(m => m.id === id))
    );
  }

  /** Search movies by title */
  search(term: string): Observable<Movie[]> {
    const q = term.toLowerCase();
    return this.loadAll().pipe(
      map(movies => movies.filter(m => m.title.toLowerCase().includes(q)))
    );
  }
}
