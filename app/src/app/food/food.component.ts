import { FoodCacheReader } from './../../util/foodCacheReader';
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

  chosenID!: number;
  alternatives: Dish[] = [];
  alternativeIDs: number[] = [];

  // [Online/Offline] Bestämmer om rätter ska hämtas från api eller chachad data för att inte använda upp API-nyckel.
  mode:runMode = runMode.Offline;


  // En default dish som visas tills det att en ny har laddats in
  chosenDish: Dish;

  chosenAlternatives:Dish[];

  constructor(private SpoonacularService: SpoonacularService) {
    this.chosenDish = this.initDish;
    this.chosenAlternatives = [this.initDish, this.initDish, this.initDish]
  }

  ngOnInit(): void {
    this.generateDishes(this.mode, this.cuisine, ()=>{
      this.randomizeDish();
    });
  }

  generateDishes(mode:runMode, cuisine:Countries, callback:Function = ()=>{}){
    //(Conditional (ternary)):  boolean?  <om true>:<om false>
    mode? this.generateDishesAPI(cuisine, callback): this.generateDishesCache(cuisine, callback); // Generar tillgängliga rätter baserat på läget applikationen körs i
  }

  randomizeDish() {
    this.chosenID = this.randomChoiceFromArray(this.ids);

    this.chosenDish = this.getDishFromArray(this.chosenID, this.dishes)
  }

  generateDishesCache(cuisine:Countries, callback:Function = ()=>{}) {
    new FoodCacheReader(this.cuisine, (builtReader:FoodCacheReader)=>{
      this.dishes = builtReader.getDishes();
      this.ids = builtReader.getIds();
      callback()
    })
  }

  toggleFetchMode(){
    this.mode? this.mode=runMode.Offline:this.mode=runMode.Online;
     this.generateDishes(this.mode, this.cuisine, ()=>{
      this.randomizeDish();
    });
  }

  /*
  Returnerar rätten som har det valda IDt
  */
 getDishFromArray(id: number, dishes: Dish[]): Dish {
   let basic: Dish = {
      title: "basic dish",
      readyInMinutes: 0,
      spoonacularScore: 0,
      pricePerServing: 0,
      image: "string",
      id: -1,
      sourceUrl:""
    };

    return dishes.find((dish)=> dish.id === id) || basic;  // Returnerar basic om find ger undefined

  }

  randomChoiceFromArray(array:any[]):any {
    return array[this.getRandomInt(array.length)]
  }

  getRandomInt(max:number):number {
   return Math.floor(Math.random() * Math.floor(max));
  }

  public generateDishesAPI(cuisine:Countries, callback:Function = ()=>{}):void{
    let placeHolderDish:Dish = {
      title: "Fetching from API...",
      readyInMinutes: 0,
      spoonacularScore: 0,
      pricePerServing: 0,
      image: "",
      id: -1,
      sourceUrl: ""
    }
    this.chosenDish = placeHolderDish;
    this.SpoonacularService.getCuisineDetails(cuisine) // Hämtar all information baserat på land
      .subscribe(
        (response) => {                           //next() callback
          this.extractIds(response.results, (ids:number[])=>{
            this.ids = ids;
            this.saveDishes(ids, ()=>{
              callback()
            });
          })
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        },
        () => {                                   //complete() callback
        })
  }

  public saveDishes(ids:number[], callback:Function = ()=>{}):void{
    let dishID:number = -1;
    this.SpoonacularService.getFromIds(ids.toString())
      .subscribe(
        (response) => {                           //next() callback
          this.extractDishes(response, (dishes:Dish[])=>{
            this.dishes = dishes;
            callback();
          });
          /* dishID = this.randomChoiceFromArray(this.ids);
          this.chosenID = dishID;
          this.chosenDish = this.getChosenDish(dishID, this.dishes); */
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')

        },
        () => {                                   //complete() callback
        })
  }
  extractDishes(response: Object, callback:Function = ()=>{}): void {
    let dishes: Dish[] = [];
     Object.entries(response).forEach(
      ([key, value]) => {
        dishes.push(value);
      }
    );
    callback(dishes);
  }

  extractIds(response:Object, callback:Function = ()=>{}):void{
    let ids:number[] = [];
    Object.entries(response).forEach(
      ([key, value]) => {
        ids.push(value.id);
      }
    );
    callback(ids)
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
