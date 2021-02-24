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
  alternatives: Dish[] = [];

  loading: boolean = false;

  dish: Dish = {
  title: "Randomizing",
  readyInMinutes: 0,
  spoonacularScore: 0,
  pricePerServing: 0,
  image: "string",

};

  constructor(private SpoonacularService: SpoonacularService) {
    this.generateDishes(this.cuisine);
    this.dishes[0] = this.dish;
    this.dishes.push(this.dish);
    console.log(this.dishes);
  }

  ngOnInit(): void {
    this.chosenID = this.randomChoiceFromArray(this.ids);
    this.randomiseAlternatives(3);
  }

  randomChoiceFromArray(array:any[]):any {
    return array[this.getRandomInt(array.length)]
  }

  getRandomInt(max:number) {
   return Math.floor(Math.random() * Math.floor(max));
  }

  public generateDishes(cuisine:Countries){
    let ids = [];
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
    let dishes = [];
    this.loading = true;
    this.SpoonacularService.getFromIds(ids.toString())
      .subscribe(
        (response) => {                           //next() callback
          this.dishes = this.extractDishes(response);
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
    return ids;
  }

  // hanterar ramdomiseringen av alternativa rätter, fast bättre (egen lista istället för dishes. Behövs detta?)
  randomiseAlternatives(nbrAlternatives: number) {
    this.alternatives = [];
    let candidates: Dish[] = [];
    this.dishes.forEach(element => {
      candidates.push(element)
    });
    let k = Math.min(nbrAlternatives, candidates.length);
    let dish: Dish;

    for (let i = 0; i < k; i++) {
      dish = this.randomChoiceFromArray(candidates);
      candidates = candidates.filter(obj => obj !== dish); // funkar detta? ska det vara dish.något?
      this.alternatives.push(dish);
    }
  }
}
