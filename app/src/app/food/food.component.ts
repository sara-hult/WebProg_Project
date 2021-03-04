import { Countries } from './../../util/countries';
import { FoodCacheReader } from './../../util/foodCacheReader';
import { runMode } from './../../util/runMode';
import { Dish } from './../../util/dish';
import { SpoonacularService } from './spoonacular.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
/*
Denna komponenten morsvarar själva matsidan.
Vi kommer att ha 2 subkomponenter: DiplayDish och DisplayAlternatives
Tar in ett objekt med alla maträtter tillhörande landet

Ska kunna hämta ut alla tillgängliga ids och lägga i en vektor
Ska kunna välja ut ids slumpvist utan dubletter


DisplayDish:
  Tar in objektet tillhörande den valda rätten.
  Ska hämta ut önskad information från objektet och visa det på lämpligt sätt
  ** Länka till ett riktigt recept

DisplayAlternatives
  En mindre lista med flera DisplayDish componenter
  Tar in tre stycken slumpvalda objekt med maträtter
*/
@Component({
  selector: 'FoodComponent',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  @Input() cuisine!:Countries;
  ids: number[] = [];

  initDish: Dish = {
    title: "Randomizing",
    readyInMinutes: 0,
    spoonacularScore: 0,
    pricePerServing: 0,
    image: "string",
    id: -1,
    sourceUrl: ""
  };

  dishes: Dish[] = [];



  chosenDish: Dish;
  chosenAlternatives: Dish[] = [];

  constructor(private SpoonacularService: SpoonacularService, private route: ActivatedRoute) {
    this.chosenDish = this.initDish;
    this.chosenAlternatives = [this.initDish, this.initDish, this.initDish]
    this.getDishesFromStorage();
    this.getChosenFromStorage();
  }

  ngOnInit(): void {
    this.randomiseAlternatives(3);

  }

  getChosenFromStorage() {
    let dish: string|null = localStorage.getItem("chosenDish");
    dish? this.chosenDish = JSON.parse(dish): '';
  }
  getDishesFromStorage() {
    let dishes: string|null = localStorage.getItem("dishes");
    dishes? this.dishes = JSON.parse(dishes): '';
  }

  /*
  Väljer en ny rätt från de inladdade rätterna
  Anropas av knapp
  */
  randomizeDish() {
    let dish: Dish = this.randomChoiceFromArray(this.dishes);
    this.chosenDish = dish;
    localStorage.setItem("chosenDish", JSON.stringify(dish))
  }

  /*
  Returnerar ett objekt från den givna vektorn
   */
  randomChoiceFromArray(array:any[]):any {
    return array[this.getRandomInt(array.length)]
  }

  getRandomInt(max:number):number {
   return Math.floor(Math.random() * Math.floor(max));
  }

  /*
  Hanterar ramdomiseringen av alternativa rätter
  */
  randomiseAlternatives(nbrAlternatives: number) {
    this.chosenAlternatives = [];
    let candidates: Dish[] = this.dishes.filter((dish)=>dish.id !== this.chosenDish.id);
    let k = Math.min(nbrAlternatives, candidates.length);
    let dish: Dish;

    for (let i = 0; i < k; i++) {
      dish = this.randomChoiceFromArray(candidates);
      candidates = candidates.filter(obj => obj !== dish); // funkar detta? ska det vara dish.något?
      this.chosenAlternatives.push(dish);
    }
  }

  /*
  Byter ut den valda rätten mot den rätt som har angivet id
  Anropas med hjälp av DisplayAlternatives output
  */
  switchToAlternative(id:number){
    let dish: Dish = this.dishes.filter((alternative:Dish)=>alternative.id === id)[0] || this.chosenDish;
    this.chosenDish = dish;
    localStorage.setItem("chosenDish", JSON.stringify(dish))
  }

}
