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
import { DisplayDrinkComponent } from './drinks/display-drink/display-drink.component';
import { DisplayDrinkAlternativesComponent } from './drinks/display-drink-alternatives/display-drink-alternatives.component';

@NgModule({
  declarations: [
    AppComponent,
    DrinksComponent,
    MoviesComponent,
    DisplayDrinkComponent,
    DisplayDrinkAlternativesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FoodComponentModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot([
      {path: 'food/:cuisine', component: FoodComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
