import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie.model';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // ✔ Correct path (always starts with assets/)
  private dataUrl = '/assets/data/movies.json';

  private movies$?: Observable<Movie[]>;

  constructor(private http: HttpClient) {}

  // Load once & cache
  private loadAll(): Observable<Movie[]> {
    if (!this.movies$) {
      this.movies$ = this.http.get<Movie[]>(this.dataUrl).pipe(
        shareReplay(1)   // cache the result
      );
    }
    return this.movies$;
  }

  getAll(): Observable<Movie[]> {
    return this.loadAll();
  }

  getNowShowing(): Observable<Movie[]> {
    return this.loadAll().pipe(
      map(list => list.filter(m => m.nowShowing))
    );
  }

  getSpotlight(): Observable<Movie[]> {
    return this.loadAll().pipe(
      map(list => list.filter(m => m.spotlight))
    );
  }

  getComingSoon(): Observable<Movie[]> {
    return this.loadAll().pipe(
      map(list => list.filter(m => m.comingSoon))
    );
  }

  search(term: string): Observable<Movie[]> {
    const q = term.toLowerCase();
    return this.loadAll().pipe(
      map(list => list.filter(m => m.title.toLowerCase().includes(q)))
    );
  }

  getById(id: string): Observable<Movie | undefined> {
    return this.loadAll().pipe(
      map(list => list.find(m => m.id === id))
    );
  }
}
