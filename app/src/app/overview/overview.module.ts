import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayDishModule } from '../food/display-dish/display-dish.module';
import { DisplayDrinkModule } from '../drinks/display-drink/display-drink.module';
import { OverviewComponent } from './overview.component';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    DisplayDishModule,
    DisplayDrinkModule
  ]
})
export class OverviewModule { }
