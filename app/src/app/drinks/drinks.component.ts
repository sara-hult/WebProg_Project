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
  
  drink: Drink = {
    name: "",
    ingredients: [],
    measurements: [],
    instruction: ""
  };
  italyList = ['aperol spritz', 'bellini', 'bellini martini', 'campari beer', 'negroni', 'espresso rumtini', 'espresso martini', 'Gagliardo', 'Garibaldi Negroni', 'Paloma', 'Spritz Veneziano'];
  americaList = [];
  scottishList = [];

  drinkList: Drink[] = [];
  drinkJSONList: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Simple GET request with response type <any> som används som temporärt test.
    let drinkName = "campari beer";
    this.http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drinkName).subscribe(data => {
      this.drink.name = data.drinks[0].strDrink;
      this.drink.ingredients[0] = data.drinks[0].strIngredient1;
      this.drink.measurements[0] = data.drinks[0].strMeasure1;
      this.drink.instruction = data.drinks[0].strInstructions;
    })


   this.fetchDrinkJSONs(this.italyList);
  }

  fetchDrinkJSONs(fetchList: String[]) {
    fetchList.map(element => {
      this.http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + element)
      .subscribe(data => {
        this.drinkJSONList.push(data);
      })
    })
    //console.log(this.cocktailJSONList);
    this.addDrinks();
  }

  addDrinks() {
    let tempDrink: Drink;
    this.drinkJSONList.forEach(element => {
      tempDrink.name = element[0].strDrink;
      tempDrink.ingredients[0] = element.drinks[0].strIngredient1;
      tempDrink.measurements[0] = element.drinks[0].strMeasure1;
      tempDrink.instruction = element.drinks[0].strInstructions;
      this.drinkList.push(tempDrink);
    })
  }

  getCountyList(country: string) {
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

