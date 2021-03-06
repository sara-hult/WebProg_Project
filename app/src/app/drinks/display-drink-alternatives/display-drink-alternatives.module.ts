import { CommonModule } from '@angular/common';
import { DisplayDrinkModule } from './../display-drink/display-drink.module';
import { DisplayDrinkAlternativesComponent } from './display-drink-alternatives.component';

import {MatCardModule} from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { Input, NgModule } from '@angular/core';

@NgModule({

   imports: [DisplayDrinkModule, CommonModule, MatCardModule, MatGridListModule],
   exports: [DisplayDrinkAlternativesComponent],
   declarations: [DisplayDrinkAlternativesComponent],
   providers: [],
})

export class DisplayDrinkAlternativesModule {
}