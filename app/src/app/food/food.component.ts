import { runMode } from './../../util/runMode';
import { Dish } from './../../util/dish';
import { SpoonacularService } from './spoonacular.service';
import { Component, Input, OnInit } from '@angular/core';
import { Countries } from '../../util/countries';
import  exampleDish  from '../../util/exampleDish';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
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
  @Input() country!:Countries;
  cuisine: Countries = Countries.USA;
  ids: number[] = [];

  dishes: Dish[] = [];
  chosenID!: number;

  mode:runMode = runMode.Online; // Bestämmer om rätter ska hämtas från api eller chachad data för att inte använda upp API-nyckel.
  loading: boolean = false;

  chosenDish: Dish = {
  title: "Randomizing",
  readyInMinutes: 0,
  spoonacularScore: 0,
  pricePerServing: 0,
  image: "string",
  id: -1
};

  constructor(private SpoonacularService: SpoonacularService) {
    this.generateDishes(this.cuisine);
  }

  ngOnInit(): void {

  }
  chooseDish(chosenID: number, dishes: Dish[]): Dish {
    let basic: Dish = {
      title: "basic dish",
      readyInMinutes: 0,
      spoonacularScore: 0,
      pricePerServing: 0,
      image: "string",
      id: -1
    };

    console.log(dishes.map((dish)=> `Chosen:${chosenID} Dish:${dish.id}: ${dish.id === chosenID}`));

    return dishes.find((dish)=> dish.id === chosenID) || basic;  // Returnerar basic om find ger undefined

  }

  randomChoiceFromArray(array:number[]):number {
    console.log(`array to choose from: ${array}`)
    return array[this.getRandomInt(array.length)]
  }

  getRandomInt(max:number):number {
   return Math.floor(Math.random() * Math.floor(max));
  }

  public generateDishes(cuisine:Countries){
    this.loading = true;
    this.SpoonacularService.getCuisineDetails(cuisine) // Hämtar all information baserat på land
      .subscribe(
        (response) => {                           //next() callback
          this.saveDishes(this.extractIds(response.results));
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.loading = false;
        },
        () => {                                   //complete() callback
          this.loading = false;
        })
  }

  public saveDishes(ids:number[]){
    let dishID:number = -1;
    this.loading = true;
    this.SpoonacularService.getFromIds(ids.toString())
      .subscribe(
        (response) => {                           //next() callback
          this.dishes = this.extractDishes(response);
          dishID = this.randomChoiceFromArray(this.ids);
          this.chosenID = dishID;
          this.chosenDish = this.chooseDish(dishID, this.dishes);
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.loading = false;

        },
        () => {                                   //complete() callback
          this.loading = false;
        })
  }
  extractDishes(response: Object): Dish[] {
    let dishes: Dish[] = [];
     Object.entries(response).forEach(
      ([key, value]) => {
        dishes.push(value);
      }
    );
    return dishes;
  }

  extractIds(response:Object){
    let ids:number[] = [];
    Object.entries(response).forEach(
      ([key, value]) => {
        ids.push(value.id);
      }
    );
    this.ids = ids;
    return ids;
  }
}
