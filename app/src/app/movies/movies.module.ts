import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Input, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './../app-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

import { MoviesComponent } from './movies.component';
import { DisplaySelectedMovieModule } from './display-selected-movie/display-selected-movie.module';
import { DisplaySelectedMovieComponent } from './display-selected-movie/display-selected-movie.component';
import { DisplayMovieAlternativesModule } from './display-movie-alternatives/display-movie-alternatives.module';
import { DisplayMovieAlternativesComponent } from './display-movie-alternatives/display-movie-alternatives.component';



@NgModule({
  declarations: [MoviesComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    BrowserModule,
    Input,
    HttpClientModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,

    MoviesComponent,
    DisplaySelectedMovieComponent,
    DisplaySelectedMovieModule,

    DisplayMovieAlternativesComponent,
    DisplayMovieAlternativesModule
  ],
  exports: [
    MoviesComponent
  ]
})
export class MoviesModule { }
