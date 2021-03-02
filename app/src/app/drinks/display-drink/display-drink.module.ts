import { DisplayDrinkComponent } from './display-drink.component';
import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@NgModule({
    imports: [MatCardModule, MatDividerModule, MatListModule],
    exports: [DisplayDrinkComponent],
    declarations: [DisplayDrinkComponent],
    providers: [],
 })
 
 export class DisplayDrinkModule {
 }