import { ChooseCountryService } from './choose-country.service';

import { MatButtonModule } from '@angular/material/button';
import { LandingModule } from './landing/landing.module';
import { RouterModule } from '@angular/router';
import { FoodComponentModule } from './food/food.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrinksComponent } from './drinks/drinks.component';
import { MoviesComponent } from './movies/movies.component';
import { FoodComponent } from './food/food.component';

import { LandingComponent } from './landing/landing.component';
import { OverviewComponent } from './overview/overview.component';
import { DisplayDrinkComponent } from './drinks/display-drink/display-drink.component';
import { DisplayDrinkAlternativesComponent } from './drinks/display-drink-alternatives/display-drink-alternatives.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { DisplaySelectedMovieComponent } from './movies/display-selected-movie/display-selected-movie.component';
import { DisplayMovieAlternativesComponent } from './movies/display-movie-alternatives/display-movie-alternatives.component';
import { FoodCreationService } from './food-creation.service';
import { DisplayDishModule } from './food/display-dish/display-dish.module';


@NgModule({
  declarations: [
    AppComponent,
    DrinksComponent,
    MoviesComponent,
    OverviewComponent,
    DisplayDrinkComponent,
    DisplayDrinkAlternativesComponent,

    DisplayMovieAlternativesComponent,
    DisplaySelectedMovieComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    FoodComponentModule,
    HttpClientModule,
    CommonModule,
    LandingModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    DisplayDishModule,

    RouterModule.forRoot([
      {path: '', component: LandingComponent},
      {path: 'overview/:country', component: OverviewComponent},
      {path: 'food/:cuisine', component: FoodComponent},
      {path: 'drinks/:country', component: DrinksComponent},
      {path: 'movies/:country', component: MoviesComponent}
    ]),
    BrowserAnimationsModule
  ],
  providers: [ChooseCountryService, FoodCreationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
