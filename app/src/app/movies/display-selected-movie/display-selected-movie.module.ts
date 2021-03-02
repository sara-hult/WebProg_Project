import { Input, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { DisplaySelectedMovieComponent } from './display-selected-movie.component'



@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule
  ],
  exports: [DisplaySelectedMovieComponent],
  declarations: [DisplaySelectedMovieComponent],
  providers: []
})
export class DisplaySelectedMovieModule { }
