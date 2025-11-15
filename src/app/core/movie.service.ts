import { Injectable } from '@angular/core';
import { Movie } from './movie.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movies: Movie[] = [
    {
      id: '1',
      title: 'SPIDER-MAN: NO WAY HOME',
      poster: '/assets/movies/spiderman.jpg',
      rating: 8.6,
      duration: '148 min',
      genre: 'Action',
      certification: 'PG-13',
      nowShowing: true,
      spotlight: true
    },
    {
      id: '2',
      title: 'DUNE: PART TWO',
      poster: '/assets/movies/dune.jpg',
      rating: 8.8,
      duration: '156 min',
      genre: 'Sci-Fi',
      certification: 'PG-13',
      nowShowing: true
    },
    {
      id: '3',
      title: 'ROMANTIC COMEDY',
      poster: '/assets/movies/romcom.jpg',
      rating: 7.2,
      duration: '110 min',
      genre: 'Comedy',
      certification: 'U',
      comingSoon: true
    },
    {
      id: '4',
      title: 'FEATURED DRAMA',
      poster: '/assets/movies/drama.jpg',
      rating: 8.9,
      duration: '120 min',
      genre: 'Drama',
      certification: 'PG-13',
      spotlight: true
    }
  ];
  getAll(): Observable<Movie[]> {
    return of(this.movies);
  }
  getNowShowing(): Observable<Movie[]> {
    return of(this.movies.filter(m => m.nowShowing));
  }

  getSpotlight(): Observable<Movie[]> {
    return of(this.movies.filter(m => m.spotlight));
  }

  getComingSoon(): Observable<Movie[]> {
    return of(this.movies.filter(m => m.comingSoon));
  }

  search(term: string): Observable<Movie[]> {
    if (!term.trim()) return of([]);
    const q = term.toLowerCase();
    return of(this.movies.filter(m => m.title.toLowerCase().includes(q)));
  }
}
