import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../shared/services/movie.service';
import {Observable} from 'rxjs';
import {Movie} from '../../shared/interfaces/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  public movies$: Observable<Movie[]>;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.movies$ = this.movieService.getAllMovies();
  }

}
