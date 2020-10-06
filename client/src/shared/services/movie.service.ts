import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly url = 'http://localhost:5000/movies';

  constructor(
    private http: HttpClient
  ) {}

  public getAllMovies(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.url);
  }

}
