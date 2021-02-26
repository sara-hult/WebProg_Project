import { FoodComponent } from './../food/food.component';
import { OverviewComponent } from './../overview/overview.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LandingComponent } from './landing.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, FormsModule, BrowserModule, AppRoutingModule],
  exports: [LandingComponent],
  bootstrap: []
})
export class LandingModule { }
