import { CommonModule } from '@angular/common';
import { DisplayDrinkModule } from './../display-drink/display-drink.module';
import { DisplayDrinkAlternativesComponent } from './display-drink-alternatives.component';

import { Input, NgModule } from '@angular/core';

@NgModule({

   imports: [DisplayDrinkModule, CommonModule],
   exports: [DisplayDrinkAlternativesComponent],
   declarations: [DisplayDrinkAlternativesComponent],
   providers: [],
})

export class DisplayDrinkAlternativesModule {
}