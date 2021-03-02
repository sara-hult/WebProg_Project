import { Injectable } from '@angular/core';
import { count } from 'rxjs/operators';
import { Countries } from 'src/util/countries';
import { Dish } from 'src/util/dish';
import { FoodCacheReader } from 'src/util/foodCacheReader';
import { SpoonacularService } from './food/spoonacular.service';

@Injectable({
  providedIn: 'root'
})
export class FoodCreationService {

  constructor(private spoonacularService: SpoonacularService) { }

  generateDishesCache(country: Countries, callback:Function = ()=>{}) {
    new FoodCacheReader(country, (builtReader:FoodCacheReader)=>{
      callback(builtReader.getDishes());
    })
  }
    /*
    Hämtar in alla maträtter som tillhör landet från APIn.
    */
  public generateDishesAPI(country: Countries, callback:Function = ()=>{}):void{
    let placeHolderDish:Dish = {
      title: "Fetching from API...",
      readyInMinutes: 0,
      spoonacularScore: 0,
      pricePerServing: 0,
      image: "",
      id: -1,
      sourceUrl: ""
    }
    /* this.chosenDish = placeHolderDish;
    this.chosenAlternatives = [placeHolderDish, placeHolderDish, placeHolderDish] */

    this.spoonacularService.getCuisineDetails(country) // Hämtar all information baserat på land
      .subscribe(
        (response) => {                           //next() callback
          this.extractIds(response.results, (ids:number[])=>{
            this.saveDishes(ids, (dishes: Dish[])=>{
              callback(dishes)
            });
          })
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        },
        () => {})                                   //complete() callback

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


  /*
  Sparar alla rätter vars id skickas in som argument.
  Rätterna hämtas ifrån APIn
  */
  public saveDishes(ids:number[], callback:Function = ()=>{}):void{
    let dishID:number = -1;
    this.spoonacularService.getFromIds(ids.toString())
      .subscribe(
        (response) => {                           //next() callback
          this.extractDishes(response, (dishes:Dish[])=>{
            callback(dishes);
          });
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        },
        () => {})                                  //complete() callback

  }

 /*
  Anropar angiven callback med alla rätter som finns i en response
  */
  extractDishes(response: Object, callback:Function = ()=>{}): void {
    let dishes: Dish[] = [];
    Object.entries(response).forEach(
      ([key, value]) => {
        dishes.push(value);
      }
    );
    callback(dishes);
  }
}
