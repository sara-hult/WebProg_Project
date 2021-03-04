import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../../util/movie';

@Component({
  selector: 'DisplayMovieAlternatives',
  templateUrl: './display-movie-alternatives.component.html',
  styleUrls: ['./display-movie-alternatives.component.css']
})
export class DisplayMovieAlternativesComponent implements OnInit {
  @Input() alternatives!: Movie[];
  @Output() newMovieEvent = new EventEmitter<string>();

  constructor() { }

  switchSelectedMovie(id : string){
    this.newMovieEvent.emit(id);
  }

  ngOnInit(): void {
  }

}
