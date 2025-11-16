import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { MovieSection } from './section.model';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private url = 'assets/data/movie-section.json';
  private sections$?: Observable<MovieSection[]>;

  constructor(private http: HttpClient) {}

  getSections(): Observable<MovieSection[]> {
    if (!this.sections$) {
      this.sections$ = this.http.get<MovieSection[]>(this.url).pipe(
        shareReplay(1)
      );
    }
    return this.sections$;
  }
}
