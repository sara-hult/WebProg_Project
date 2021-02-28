import { ChooseCountryService } from './../choose-country.service';
import { FoodComponent } from './../food/food.component';
import { OverviewComponent } from './../overview/overview.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LandingComponent } from './landing.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, FormsModule, BrowserModule, AppRoutingModule, MatButtonModule, MatSelectModule],
  exports: [LandingComponent],
  providers:[ChooseCountryService],
  bootstrap: []
})
export class LandingModule { }
