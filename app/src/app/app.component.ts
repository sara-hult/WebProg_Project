import { Countries } from './../util/countries';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Isaks';
  country: String;
  correctCountry:Countries;

  constructor() {
    this.country = "Japan";
    this.correctCountry = Countries.USA;
  }

  getFood() {
    console.log("Food");
  }

  getDrinks() {
    console.log("Drinks");
  }

  getMovies() {
    console.log("Movies");

  }

}
