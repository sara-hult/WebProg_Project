import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { Input, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SpoonacularService } from './spoonacular.service';
import { AppRoutingModule } from './../app-routing.module';
import { DisplayDishModule } from './display-dish/display-dish.module';
import { FoodComponent } from './food.component';
import { DisplayAlternativesModule } from './display-alternatives/display-alternatives.module';

@NgModule({
   imports: [
     DisplayDishModule,
      DisplayAlternativesModule,
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      MatButtonModule
      ],
   exports: [FoodComponent],
   declarations: [FoodComponent],
   providers: [SpoonacularService],
})

export class FoodComponentModule {
}
