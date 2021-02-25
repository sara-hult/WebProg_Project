import { Component, OnInit, Input } from '@angular/core';
import { Countries } from '../../util/countries';
import { Drink } from '../../util/drink';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css'],

})
export class DrinksComponent implements OnInit {
  @Input() country!: Countries;
  tempCountry = 'italian';

  italyList = ['aperol spritz', 'bellini', 'bellini martini', 'campari beer', 'negroni', 'espresso rumtini', 'espresso martini', 'Gagliardo', 'Garibaldi Negroni', 'Paloma', 'Spritz Veneziano'];
  americaList = [];
  scottishList = [];

  drink: Drink = {
    name: "",
    ingredients: [],
    measurements: [],
    instruction: ""
  };
  drinkList: Drink[] = [];

  dispDrink: Drink = {
    name: "",
    ingredients: [],
    measurements: [],
    instruction: ""
  };
  dispDrinkAlt: Drink[] = [];
  
  //drinkJSONList: any[] = [];

  constructor(private http: HttpClient) {
    this.setDispDrink();
    this.setDispDrinkAlt();

  }

  ngOnInit() {
    // Simple GET request with response type <any> som används som temporärt test.
    /*
    let drinkName = "campari beer";
    this.http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drinkName).subscribe(data => {
      this.drink.name = data.drinks[0].strDrink;
      this.drink.ingredients[0] = data.drinks[0].strIngredient1;
      this.drink.measurements[0] = data.drinks[0].strMeasure1;
      this.drink.instruction = data.drinks[0].strInstructions;
    })
    */
   this.fetchDrinkJSONs(this.getCountryList(this.tempCountry));
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

  fetchDrinkJSONs(fetchList: String[]) {
    let JSONList:any[] = [];
    fetchList.map(element => {
      this.http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + element)
      .subscribe(data => {
        JSONList.push(data);
      })
    })
    //console.log(this.cocktailJSONList);
    this.addDrinks(JSONList);
  }

  addDrinks(JSONList: any[]) {
    let tempDrink: Drink;
    JSONList.forEach(element => {
      tempDrink.name = element[0].strDrink;
      tempDrink.ingredients[0] = element.drinks[0].strIngredient1;
      tempDrink.measurements[0] = element.drinks[0].strMeasure1;
      tempDrink.instruction = element.drinks[0].strInstructions;
      this.drinkList.push(tempDrink);
    })
  }

  setDispDrink(){

  }

  setDispDrinkAlt(){

  }

  setDummyDrinks() {
    let dummyDrink: Drink = {
      name: "",
      ingredients: [],
      measurements: [],
      instruction: ""
    }
    this.dispDrink = dummyDrink;
    this.dispDrinkAlt = [dummyDrink, dummyDrink, dummyDrink];
  }

  randomChoiceFromArray(array:any[]):any {
    return array[this.getRandomInt(array.length)]
  }

  getRandomInt(max:number) {
   return Math.floor(Math.random() * Math.floor(max));
  }

}

/*
      this.cocktail.name = data.drinks[0].strDrink;
      this.cocktail.ingredients[0] = data.drinks[0].strIngredient1;
      this.cocktail.measurements[0] = data.drinks[0].strMeasure1;
      this.cocktail.instruction = data.drinks[0].strInstructions;
      console.log("-------Skriver ut cocktailobjektet i ngOninit------");
      console.log(this.cocktail);
      console.log("------------------------------");
*/

//document.getElementsByClassName("css-1wo4jfn")[0].outerText För att få dryckesinfo från systembolaget hejehjejehejehejeheh
