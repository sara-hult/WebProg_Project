import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Isaks';

  constructor() {
    country: "Japan";
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
