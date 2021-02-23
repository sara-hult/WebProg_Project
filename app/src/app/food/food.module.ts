import { DisplayDishModule } from './display-dish/display-dish.module';
import { FoodComponent } from './food.component';
import { Input, NgModule } from '@angular/core';
import { DisplayAlternativesModule } from './display-alternatives/display-alternatives.module';

@NgModule({
   imports: [DisplayDishModule, DisplayAlternativesModule],
   exports: [FoodComponent],
   declarations: [FoodComponent, ],
   providers: [],
})

export class FoodComponentModule {
}