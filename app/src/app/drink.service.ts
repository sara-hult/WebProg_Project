import { Injectable } from '@angular/core';
import { count } from 'rxjs/operators';
import { Countries } from 'src/util/countries';
import { Drink } from 'src/util/drink';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  constructor() { }
   
  
  public generateDrinks(country: Countries,callback: Function = () => {} ) {
    this.fetchDrinksFromNames(this.drinkNames, (drinks:Drink[]) => {
      //this.allDrinks = drinks;
      callback(drinks);
    });
  }
/*
  fetchDrinksFromNames(drinkNames: Object, callback: Function = () => {}){
    let drinkArray: Drink[] = [];

    
    Object.entries(drinkNames).forEach(
      ([key, list]) => {
        Object.entries(list).forEach(
          ([key, value]) => {

            this.http.get<Object>(this.drink_url + value)
              .pipe(map(res => JSON.parse(JSON.stringify(res))))
                .subscribe(
                  (data) => {
                    this.extractDrink(data, (extractedDrink:Drink) => {
                         //console.log(extractedDrink);
                         console.log(extractedDrink);
                         drinkArray.push(extractedDrink);
                        //Här kan fler exctractmetoder läggas till
                    })
            
                  },
                  (error) => {
                    alert("nope");
                    console.error("Request failed with error")
                  }
                ); 

          }
        );    
            
    });
     callback(drinkArray);
  }
  

  extractDrink(response: Object, callback: Function = () => {}){
    let drink:Drink = {
      name: '',
      ingredients: [],
      measurements: [],
      instruction: '',
      img_url: ''
    }
  
    Object.entries(response).forEach(
      ([key, value]) => {
        drink.ingredients = this.extractSpec(response, "strIngredient");
        drink.name = value[0].strDrink;
        drink.measurements = this.extractSpec(response, "strMeasure");
        drink.instruction = value[0].strInstructions;
        drink.img_url = value[0].strDrinkThumb;
      }
    );
    callback(drink);
  }

  extractSpec(response:Object, spec:string): string[]{
    let specList: string[] = [];
    let index: number = 1;
    let specName: string;
    Object.entries(response).forEach(
      ([key, value]) =>{
        specName = value[0][spec + index];
        while(specName !== null) {
        specList.push(specName);
          index++;
          specName = value[0][spec + index];
        }
    })
    return specList;
  }
  */
}

