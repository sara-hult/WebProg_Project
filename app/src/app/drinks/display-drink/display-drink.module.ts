import { DisplayDrinkComponent } from './display-drink.component';
import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatCardModule} from '@angular/material/card';

@NgModule({
    imports: [MatCardModule],
    exports: [DisplayDrinkComponent],
    declarations: [DisplayDrinkComponent],
    providers: [],
 })
 
 export class DisplayDrinkModule {
 }