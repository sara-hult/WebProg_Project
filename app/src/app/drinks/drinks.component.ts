import { Component, OnInit, Input } from '@angular/core';
import { Countries } from '../../util/countries';
import { Drink } from '../../util/drink';
import { Observable } from 'rxjs';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'DrinksComponent',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css'],

})
export class DrinksComponent implements OnInit {
  @Input() country!: Countries;
  tempCountry = 'italian';

  selectedDrinkName!: String; 

  italyList = ['aperol spritz', 'bellini', 'bellini martini', 'campari beer', 'negroni', 'espresso rumtini', 'espresso martini', 'gagliardo', 'garibaldi negroni', 'paloma', 'Spritz Veneziano'];
  americaList = [];
  scottishList = [];

  drink: Drink = {
    name: "",
    ingredients: [],
    measurements: [],
    instruction: ""
  };
  drinkList: Drink[] = [];

  mainDrink: Drink;
  dispDrinkAlt: Drink[] = [];
  
  //drinkJSONList: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.mainDrink = this.drink;
    this.dispDrinkAlt = [this.drink, this.drink, this.drink];
    /*
    this.setDummyDrinks();
    this.setMainDrink();
    this.setDispDrinkAlt();
    */
  }

  ngOnInit() {
    //this.fetchDrinkJSONs(this.getCountryList(this.tempCountry));
    //this.setMainDrink();
    //this.addDrinks();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.country = this.getCountry(params.get('country'));
      this.getFromFetch();
      this.setMainDrink();
    });

  }

  getCountry(country: string | null): Countries {
    if(country !== null){
      switch(country){
        case "american":
          return Countries.USA;
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

  fetchDrinks(drink: string): Observable<any>{
    //console.log("fetchDrinks")
    //console.log(drink);
    return  this.http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drink);
  }
  
  getFromFetch(){
    this.italyList.forEach(element => {
      this.fetchDrinks(element).subscribe(
        res => {
          let tempDrink: Drink ={
            name: "",
            ingredients: [],
            measurements: [],
            instruction: ""
          };
          //console.log("fetch");
          //console.log(res.drinks[0]);
          tempDrink.name = res.drinks[0].strDrink;
          tempDrink.instruction = res.drinks[0].strInstructions;
          tempDrink.ingredients[0] = res.drinks[0].strIngredient1;
          tempDrink.measurements[0] = res.drinks[0].strMeasure1;
          this.drinkList.push(tempDrink);
        }
      );
    })
  }

  addDrinks() {
    this.getFromFetch();
    //console.log(this.drinkList);
/*
    console.log(tempList[0]);
    tempList.map(element => {
      console.log(JSON.stringify(element));
    })
    */
  }


  setMainDrink(){
    //console.log(this.drinkList);
    this.mainDrink = this.getNewRandomDrink();
  }

  getNewRandomDrink():Drink{
    let drink: Drink = this.randomChoiceFromArray(this.drinkList);
    /*
    if(drink.name !== this.mainDrink.name) {
      return drink;
    }else{
      return this.getNewRandomDrink();
    }
    */
   return drink;
  }
  randomChoiceFromArray(array:Drink[]):Drink {
    //console.log(array);
    //console.log(this.drinkList[0]);
    return array[this.getRandomInt(array.length)];
  }

  getRandomInt(max:number) {
   return Math.floor(Math.random() * Math.floor(max));
  }

  setDispDrinkAlt(){
    let drink: Drink
  }

  setDummyDrinks() {
    let dummyDrink: Drink = {
      name: "",
      ingredients: [],
      measurements: [],
      instruction: ""
    }
    this.mainDrink = dummyDrink;
    this.dispDrinkAlt = [dummyDrink, dummyDrink, dummyDrink];
  }
}


  /*
  fetchDrinkJSONs(fetchList: String[]) {
    let JSONList:any[] = [];
    let tempDrink: Drink;
    let tempData: any;
    fetchList.map(element => {
      this.http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + element)
      .subscribe(data => {

      })
    })
    //console.log(JSONList);
    this.addDrinks(JSONList);
  }

  addDrinks(JSONList: any[]) {
    console.log("addDrinks List");
    console.log(JSONList);
    let tempDrink: Drink;
    JSONList.forEach(element => {
      console.log("inside ForEach");
      console.log(element);
      
      tempDrink.name = element.strDrink;
      tempDrink.ingredients[0] = element.strIngredient1;
      tempDrink.measurements[0] = element.strMeasure1;
      tempDrink.instruction = element.strInstructions;
      this.drinkList.push(tempDrink);
      
    })
  }
  */

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