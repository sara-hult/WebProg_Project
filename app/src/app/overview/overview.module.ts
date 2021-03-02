import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayDishModule } from '../food/display-dish/display-dish.module';
import { OverviewComponent } from './overview.component';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    DisplayDishModule
  ]
})
export class OverviewModule { }
