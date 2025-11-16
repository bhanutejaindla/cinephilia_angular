import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie.model';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private dataUrl = 'assets/data/movies.json';

  private movies$?: Observable<Movie[]>;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Movie[]> {
    if (!this.movies$) {
      this.movies$ = this.http.get<Movie[]>(this.dataUrl).pipe(
        shareReplay(1)
      );
    }
    return this.movies$;
  }
}
