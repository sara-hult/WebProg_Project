import { MatButtonModule } from '@angular/material/button';
import { SpoonacularService } from './spoonacular.service';
import { AppRoutingModule } from './../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DisplayDishModule } from './display-dish/display-dish.module';
import { FoodComponent } from './food.component';
import { Input, NgModule } from '@angular/core';
import { DisplayAlternativesModule } from './display-alternatives/display-alternatives.module';
import { HttpClientModule } from '@angular/common/http';

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
