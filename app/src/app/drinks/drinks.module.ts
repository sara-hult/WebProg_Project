import { AppRoutingModule } from './../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DrinksComponent } from './drinks.component';
import { DisplayDrinkModule } from './display-drink/display-drink.module';
import { DisplayDrinkAlternativesModule } from './display-drink-alternatives/display-drink-alternatives.module'
import { Input, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';

@NgModule({
   imports: [
      MatCardModule,
      DisplayDrinkModule, 
      DisplayDrinkAlternativesModule,
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,

      ],
   exports: [DrinksComponent],
   declarations: [DrinksComponent],
   providers: [],
})

export class DrinksComponentModule {
}