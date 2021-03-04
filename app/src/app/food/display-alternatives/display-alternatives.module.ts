import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DisplayDishModule } from './../display-dish/display-dish.module';
import { DisplayAlternativesComponent } from './display-alternatives.component';
import { MatGridListModule } from '@angular/material/grid-list';

import { Input, NgModule } from '@angular/core';

@NgModule({

   imports: [DisplayDishModule, CommonModule, MatButtonModule, MatGridListModule],

exports: [DisplayAlternativesComponent],
   declarations: [DisplayAlternativesComponent],
   providers: [],
})

export class DisplayAlternativesModule {
}
