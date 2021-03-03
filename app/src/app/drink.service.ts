import { Injectable } from '@angular/core';
import { Countries } from 'src/util/countries';
import { Drink } from 'src/util/drink';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  constructor(private http: HttpClient) { }
  
  drink_url: string = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  drinkNames: any = {
    italian: ['aperol spritz', 'bellini', 'bellini martini', 'campari beer', 'negroni', 'espresso rumtini', 'espresso martini', 'gagliardo', 'garibaldi negroni', 'paloma', 'Spritz Veneziano'],
    american: ['a piece of ass', 'a splash of nash', 'alaska cocktail', 'americano ', 'apple cider punch', 'apple slammer', 'arizona stingers', 'arizona twister', 'army special', 'artillery punch', 'atlantic sun', 'boston sour', 'Bourbon sling', 'bourbon sour','brooklyn', 'california lemonade', 'california root beer', 'chicago fizz', 'fahrenheit 5000', 'godfather',  'iced coffee', 'jello shots', 'kentucky b and b', 'kentucky colonel'],
    scottish: ['afternoon','baby guinness', 'balmoral', 'black and brown','flying scotchman','Sherry Eggnog', 'Scotch Sour','Scottish Highland Liqueur','Snake Bite']
  };
   
  public generateDrinks(country: Countries,callback: Function = () => {} ) {
    this.fetchDrinksFromNames(this.drinkNames[country], (drinks:Drink[]) => {
      callback(drinks);
    }); 
  }

  fetchDrinksFromNames(drinkNames: string[], callback: Function = () => {}){
    let drinkArray: Drink[] = [];
    
    drinkNames.forEach( element => {
        this.http.get<Object>(this.drink_url + element)
          .pipe(map(res => JSON.parse(JSON.stringify(res))))
            .subscribe(
              (data) => {
                this.extractDrink(data, (extractedDrink:Drink) => {
                  drinkArray.push(extractedDrink);
                })
            
                },
               (error) => {
                 console.error("Request failed with error")
               }, () => {
                 if(drinkArray.length === drinkNames.length) {
                   callback(drinkArray);
                 }
               }
           ); 
          },
        );    
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
  
}

