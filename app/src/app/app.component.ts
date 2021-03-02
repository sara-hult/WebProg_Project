import { ChooseCountryService } from './choose-country.service';
import { NavigationEnd, Router } from '@angular/router';
import { Countries } from './../util/countries';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Drink } from '../util/drink';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DrinkService } from './drink.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Isaks';
  country: String;
  correctCountry:Countries;
  newCountrySubscription: Subscription;
  url:string = "/";

  drink_url: string = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  drinkNames: Object = {
    italian: ['aperol spritz', 'bellini', 'bellini martini', 'campari beer', 'negroni', 'espresso rumtini', 'espresso martini', 'gagliardo', 'garibaldi negroni', 'paloma', 'Spritz Veneziano'],
    american: ['a piece of ass', 'a splash of nash', 'alaska cocktail', 'americano ', 'apple cider punch', 'apple slammer', 'arizona stingers', 'arizona twister', 'army special', 'artillery punch', 'atlantic sun', 'boston sour', 'Bourbon sling', 'bourbon sour','brooklyn', 'california lemonade', 'california root beer', 'chicago fizz', 'fahrenheit 5000', 'godfather',  'iced coffee', 'jello shots', 'kentucky b and b', 'kentucky colonel'],
    scottish: ['afternoon','baby guinness', 'balmoral', 'black and brown','flying scotchman','Sherry Eggnog', 'Scotch Sour','Scottish Highland Liqueur','Snake Bite']
  };
 
  allDrinks: Drink[] = [];

  constructor(private _router: Router, private chooseCountryService: ChooseCountryService, private http: HttpClient , private drinkService : DrinkService) {
    this.country = "Japan";
    this.correctCountry = Countries.USA;
    this.newCountrySubscription = chooseCountryService.countryChanged$.subscribe((newCountry)=>{
      console.log(newCountry);
      this.setCountry(newCountry);
    })
    _router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd ){
        this.url = val.url;
      }
    })
  }

  setCountry(country: Countries): void {
    this.correctCountry = country;
    this.generateDrinks((drinks: Drink[]) =>{

      console.log(drinks);
      localStorage.setItem("drinks", JSON.stringify(drinks));
      this._router.navigate(["overview/", country]);
    })
  }

  atLanding():boolean{
    return this.url==="/"
  }

  generateDrinks(callback:Function = () => {}) { 
    this.drinkService.generateDrinks(this.correctCountry, callback);
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
 