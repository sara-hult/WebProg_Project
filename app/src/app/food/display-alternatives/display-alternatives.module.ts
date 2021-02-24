import { DisplayAlternativesComponent } from './display-alternatives.component';

import { Input, NgModule } from '@angular/core';
import { DisplayDishModule } from '../display-dish/display-dish.module';

@NgModule({
   imports: [DisplayDishModule],
   exports: [DisplayAlternativesComponent],
   declarations: [DisplayAlternativesComponent],
   providers: [],
})

export class DisplayAlternativesModule {
}