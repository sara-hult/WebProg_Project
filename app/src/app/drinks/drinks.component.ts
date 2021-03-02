import { Component, OnInit, Input } from '@angular/core';
import { Countries } from '../../util/countries';
import { Drink } from '../../util/drink';
import { iif, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'DrinksComponent',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css'],

})
export class DrinksComponent implements OnInit {
  //@Input() country!: Countries;
  @Input() inputDrinks!: Drink[];

  /*italyList = ['aperol spritz', 'bellini', 'bellini martini', 'campari beer', 'negroni', 'espresso rumtini', 'espresso martini', 'gagliardo', 'garibaldi negroni', 'paloma', 'Spritz Veneziano'];
  americaList = ['a piece of ass', 'a splash of nash', 'alaska cocktail', 'americano ', 'apple cider punch', 'apple slammer', 'arizona stingers', 'arizona twister', 'army special', 'artillery punch', 'atlantic sun', 'boston sour', 'Bourbon sling', 'bourbon sour','brooklyn', 'california lemonade', 'california root beer', 'chicago fizz', 'fahrenheit 5000', 'godfather',  'iced coffee', 'jello shots', 'kentucky b and b', 'kentucky colonel'];
  scottishList = ['afternoon','baby guinness', 'balmoral', 'black and brown','flying scotchman','Sherry Eggnog', 'Scotch Sour','Scottish Highland Liqueur','Snake Bite'];
*/
  unspecifiedDrink: Drink = {
    name: "",
    ingredients: [],
    measurements: [],
    instruction: "",
    img_url: ""
  };

  drinkList: Drink[] = [];

  //drinkNames: string[] = [];

  mainStringDrink: string = "";

  mainDrink: Drink;
  dispDrinkAlt: Drink[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.mainDrink = this.unspecifiedDrink;
    this.dispDrinkAlt = [this.unspecifiedDrink, this.unspecifiedDrink, this.unspecifiedDrink];
  }

  ngOnInit(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.getDrink(params.get('country'), (drinks:Drink[]) => {
        console.log(drinks);
      });
      //this.inputDrinks = params.get('drink');
      //this.getDrink(params.get('drink'));
    });
  }
  getDrink(inputDrinks:any, callback:Function = () => {}){
    let temp: Drink[] = JSON.parse(inputDrinks);
    let drinkArray: Drink[] = [];
    let drink:Drink = this.unspecifiedDrink;

    temp.forEach(element => {
      console.log("hejsan");
      drink.ingredients = element.ingredients;
      drink.name = element.name;
      drink.measurements = element.measurements;
      drink.instruction = element.instruction;
      drink.img_url = element.img_url;
      drinkArray.push(drink);
    })
    console.log("hej");
    callback(drinkArray);
  }

  /*
      
    console.log(this.drinkList);
    inputDrinks.pipe(map(res => JSON.parse(JSON.stringify(res))))
        .subscribe(
          (element:any) =>{
            console.log(element);
            drink.ingredients = element.ingredients;
            drink.name = element.name;
            drink.measurements = element.measurements;
            drink.instruction = element.instruction;
            drink.img_url = element.img_url;
            drinkArray.push(drink);
          }
        );
        console.log(drinkArray);


  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.country = this.getCountry(params.get('country'));
      this.generateDrinks(this.country, () => {
        this.getRandomDrink(this.drinkList);
        this.getRandomAlternativies(3);
      });
    });
  }

  getCountry(country: string | null): Countries {
    if(country !== null){
      switch(country){
        case "american":
          return Countries.USA;
        case "italian":
          return Countries.Italy;
        case "scottish":
          return Countries.Scotland ;
        default:
          throw new Error('404 Country not implemented')

      }
    }else{
      throw new Error('404 Ett land måste anges ex: american');
    }
  }


  getCountryList(country: string) {
    switch(country) {
      case 'american':
        return this.americaList;
      case 'italian':
        return this.italyList;
      case 'scottish':
        return  this.scottishList;
      default:
        return [];
    }
  }

  generateDrinks(country: Countries, callback:Function = () => {}) {
    this.drinkNames = this.getCountryList(country);
    this.fetchDrinksFromNames(this.drinkNames, (drinks:Drink[]) => {
      this.drinkList = drinks;
      callback();
    });
  }

  fetchDrinksFromNames(drinkNames: string[], callback: Function = () => {}){
    let drinkArray: Drink[] = [];
    drinkNames.forEach(drink => {
      this.http.get<Object>('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drink)
        .pipe(map(res => JSON.parse(JSON.stringify(res))))
        .subscribe(
          (data) => {
            this.extractDrink(data, (extractedDrink:Drink) => {
              //console.log(extractedDrink);
              drinkArray.push(extractedDrink);
            })
            
          },
          (error) => {
            alert("nope");
            console.error("Request failed with error")
          },
          () => {
            if(drinkArray.length === drinkNames.length){
              callback(drinkArray)
            }
          }
        );
    })
  }

  extractDrink(response: Object, callback: Function = () => {}){
    let drink:Drink = {
      name: '',
      ingredients: [],
      measurements: [],
      instruction: '',
      img_url: ''
    }
    let ingredientList : string[] = [];
  
    Object.entries(response).forEach(
      ([key, value]) => {
        drink.ingredients = this.extractSpec(response, "strIngredient");
        drink.name = value[0].strDrink;
        drink.measurements = this.extractSpec(response, "strMeasure");
        drink.instruction = value[0].strInstructions;
        drink.img_url = value[0].strDrinkThumb;
      }
      //value[0].strIngredient1,

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

  getRandomDrink(drinks: Drink[]){
    this.mainDrink = this.randomChoiceFromArray<Drink>(drinks)
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
    localStorage.setItem("drink", JSON.stringify(this.mainDrink));
  }

}