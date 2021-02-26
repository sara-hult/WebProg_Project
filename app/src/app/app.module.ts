
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


@NgModule({
  declarations: [
    AppComponent,
    DrinksComponent,
    MoviesComponent,
    OverviewComponent,
    DisplayDrinkComponent,
    DisplayDrinkAlternativesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FoodComponentModule,
    HttpClientModule,
    CommonModule,
    LandingModule,
    MatButtonModule,
    RouterModule.forRoot([
      {path: '', component: LandingComponent},
      {path: 'overview/:country', component: OverviewComponent},
      {path: 'food/:cuisine', component: FoodComponent}
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
