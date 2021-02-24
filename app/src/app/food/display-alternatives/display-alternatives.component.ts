import { Component, OnInit, Input } from '@angular/core';
import { Dish } from './../../../util/dish';
import { DisplayDishComponent } from './../display-dish/display-dish.component';

@Component({
  selector: 'DisplayAlternatives',
  templateUrl: './display-alternatives.component.html',
  styleUrls: ['./display-alternatives.component.css']
})
export class DisplayAlternativesComponent implements OnInit {
  @Input() dishes!: Dish[];
  dishesOnDisplay: Dish[] = [];

  dummy: Dish = {
    title: "NoDish",
    readyInMinutes: 0,
    spoonacularScore: 0,
    pricePerServing: 0,
    image: "string",
  };

  constructor() { 
    this.dishesOnDisplay[0] = this.dummy;
    this.dishesOnDisplay[1] = this.dummy;
    this.dishesOnDisplay[2] = this.dummy;
  }

  ngOnInit(): void {
    // kör en metod som randomiserar vilka rätter som läggs i dishesOnDisplay
    //this.randomizeChoices();
    console.log(this.dishes);
  }

  randomChoiceFromArray(array:any[]):any {
    return array[this.getRandomInt(array.length)]
  }

  getRandomInt(max:number) {
   return Math.floor(Math.random() * Math.floor(max));
  }

  randomizeChoices() {
    // väljer ut 3 unika objekt ur dishes och sparar dessa i dishesOnDisplay
    //this.dishesOnDisplay.map()
  }

}
