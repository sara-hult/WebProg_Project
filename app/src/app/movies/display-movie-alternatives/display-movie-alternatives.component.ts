import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../util/movie';

@Component({
  selector: 'DisplayMovieAlternatives',
  templateUrl: './display-movie-alternatives.component.html',
  styleUrls: ['./display-movie-alternatives.component.css']
})
export class DisplayMovieAlternativesComponent implements OnInit {
  @Input() alternatives!: Movie[];

  constructor() { }

  ngOnInit(): void {
  }

}
