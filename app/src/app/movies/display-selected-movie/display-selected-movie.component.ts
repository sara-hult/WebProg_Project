import { Component, Input, OnInit } from '@angular/core';
import { Movie } from './../../../util/movie';

@Component({
  selector: 'DisplaySelectedMovie',
  templateUrl: './display-selected-movie.component.html',
  styleUrls: ['./display-selected-movie.component.css']
})
export class DisplaySelectedMovieComponent implements OnInit {
  @Input() movie!: Movie;

  constructor() { }

  ngOnInit(): void {
  }

}
