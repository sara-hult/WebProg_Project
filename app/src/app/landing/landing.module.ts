import { BrowserModule } from '@angular/platform-browser';
import { LandingComponent } from './landing.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, FormsModule, BrowserModule],
  exports: [LandingComponent],
  bootstrap: []
})
export class LandingModule { }
