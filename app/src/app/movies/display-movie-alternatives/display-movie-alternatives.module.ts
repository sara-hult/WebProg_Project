import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { DisplaySelectedMovieModule } from './../display-selected-movie/display-selected-movie.module';
import { DisplaySelectedMovieComponent } from './../display-selected-movie/display-selected-movie.component';
import { DisplayMovieAlternativesComponent } from './display-movie-alternatives.component';



@NgModule({
  declarations: [DisplayMovieAlternativesComponent],
  exports: [DisplayMovieAlternativesComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    DisplaySelectedMovieComponent,
    DisplayMovieAlternativesComponent
  ]
})
export class DisplayMovieAlternativesModule { }
