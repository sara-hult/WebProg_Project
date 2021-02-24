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
  @Input() country!:Countries;
  cuisine: Countries = Countries.USA;
  ids: number[] = [];

  dishes: Dish[] = [];
  chosenID: number = -1;
  alternativeIDs: number[] = [];

  // [Online/Offline] Bestämmer om rätter ska hämtas från api eller chachad data för att inte använda upp API-nyckel.
  mode:runMode = runMode.Offline;
  loading: boolean = false;


  // En default dish som visas tills det att en ny har laddats in
  chosenDish: Dish = {
  title: "Randomizing",
  readyInMinutes: 0,
  spoonacularScore: 0,
  pricePerServing: 0,
  image: "string",
  id: -1
};

  constructor(private SpoonacularService: SpoonacularService) {
    this.generateDishes(this.mode, this.cuisine);
  }

  ngOnInit(): void {
  }

  generateDishes(mode:runMode, cuisine:Countries){
    mode? this.generateDishesAPI(cuisine): this.generateDishesCache(cuisine); // Generar tillgängliga rätter baserat på läget applikationen körs i
  }

  generateDishesCache(cuisine:Countries) {
    new FoodCacheReader(this.cuisine, (builtReader:FoodCacheReader)=>{
      this.dishes = builtReader.getDishes();
      this.ids = builtReader.getIds();

      console.log("Dishes and IDs from cache:");
      console.log(this.dishes);
      console.log(this.ids);

      this.chosenID = this.randomChoiceFromArray(this.ids);
      this.chosenDish = this.getChosenDish(this.chosenID, this.dishes)
    })
  }
  /*
  Returnerar rätten som har det valda IDt
  */
 getChosenDish(chosenID: number, dishes: Dish[]): Dish {
   let basic: Dish = {
      title: "basic dish",
      readyInMinutes: 0,
      spoonacularScore: 0,
      pricePerServing: 0,
      image: "string",
      id: -1
    };

    return dishes.find((dish)=> dish.id === chosenID) || basic;  // Returnerar basic om find ger undefined

  }

  randomChoiceFromArray(array:any[]):any {
    console.log(`array to choose from: ${array}`)
    return array[this.getRandomInt(array.length)]
  }

  getRandomInt(max:number):number {
   return Math.floor(Math.random() * Math.floor(max));
  }

  public generateDishesAPI(cuisine:Countries):void{
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

  public saveDishes(ids:number[]):void{
    let dishID:number = -1;
    this.loading = true;
    this.SpoonacularService.getFromIds(ids.toString())
      .subscribe(
        (response) => {                           //next() callback
          this.dishes = this.extractDishes(response);
          dishID = this.randomChoiceFromArray(this.ids);
          this.chosenID = dishID;
          this.chosenDish = this.getChosenDish(dishID, this.dishes);
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

  extractIds(response:Object):number[]{
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
