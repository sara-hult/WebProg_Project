import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Isaks';

  constructor() {

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
