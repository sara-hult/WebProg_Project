import { MatButtonModule } from '@angular/material/button';
import { DisplayDishComponent } from './display-dish.component';
import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';

@NgModule({
   imports: [MatCardModule, MatButtonModule],
   exports: [DisplayDishComponent],
   declarations: [DisplayDishComponent],
   providers: [],
})

export class DisplayDishModule {
}
