import { Component, OnInit, Input } from '@angular/core';
import { Drink } from '../../util/drink';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'DrinksComponent',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css'],

})
export class DrinksComponent implements OnInit {
 // @Input() inputDrinks!: Drink[];

  unspecifiedDrink: Drink = {
    name: "",
    ingredients: [],
    measurements: [],
    instruction: "",
    img_url: ""
  };

  drinkList: Drink[] = [];
  mainDrink: Drink;
  dispDrinkAlt: Drink[] = [];

  constructor(private route: ActivatedRoute) {
    this.mainDrink = this.unspecifiedDrink;
    this.dispDrinkAlt = [this.unspecifiedDrink, this.unspecifiedDrink, this.unspecifiedDrink];
  }

  ngOnInit(){
    this.setFromLocalStorage((drinks : Drink[]) => {
      this.drinkList = drinks;
    });
    this.setMainFromLocalStorage((main : Drink) => {
      this.mainDrink= main;
      this.getRandomAlternativies(3);
    });    
  }
  
  setFromLocalStorage(callback: Function = () => {})  {
    let temp: string | null = localStorage.getItem("drinks");
    temp? temp = JSON.parse(temp):  '';
    callback(temp);
  }

  setMainFromLocalStorage(callback: Function = () => {}) {
    let temp: string | null = localStorage.getItem("mainDrink");
    temp? temp = JSON.parse(temp):  '';
    callback(temp);
  }

  getRandomDrink(drinks: Drink[]){
    this.mainDrink = this.randomChoiceFromArray<Drink>(drinks)
    localStorage.setItem("mainDrink", JSON.stringify(this.mainDrink));
    this.getRandomAlternativies(3);
  }

  getRandomAlternativies(quantity: number){
    this.dispDrinkAlt = [];
    let candidates: Drink[] = this.drinkList.filter((drink) => drink.name !== this.mainDrink.name);
    let i = 0;
    let drink: Drink;
    while(i < quantity && i < candidates.length){
      drink = this.randomChoiceFromArray(candidates);
      candidates = candidates.filter((tempDrink) => tempDrink.name !== drink.name);
      this.dispDrinkAlt.push(drink);
      i++;
    }
  }

  getDrinkFromArray(drinkName: string, drinks: Drink[]): Drink{
    let drink: Drink;
    drink = drinks.filter((tempDrink) => tempDrink.name === drinkName)[0];
    if(drink === undefined) {
      throw new Error("Drink not found in array");
    }
    return drink;
  }

  randomChoiceFromArray<T>(array:T[]):T {
    return array[this.getRandomInt(array.length)];
  }

  getRandomInt(max:number): number {
   return Math.floor(Math.random() * Math.floor(max));
  }

  randomizeDrink() {
    this.getRandomDrink(this.drinkList);
  }

  setDrink(): void {
    localStorage.setItem("mainDrink", JSON.stringify(this.mainDrink));
  }
}
