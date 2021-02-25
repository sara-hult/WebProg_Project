import { CommonModule } from '@angular/common';
import { DisplayDishModule } from './../display-dish/display-dish.module';
import { DisplayAlternativesComponent } from './display-alternatives.component';

import { Input, NgModule } from '@angular/core';

@NgModule({

   imports: [DisplayDishModule, CommonModule],
   exports: [DisplayAlternativesComponent],
   declarations: [DisplayAlternativesComponent],
   providers: [],
})

export class DisplayAlternativesModule {
}
