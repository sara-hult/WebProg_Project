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
  @Input() country!: Countries;
  tempCountry = 'italian';

  italyList = ['aperol spritz', 'bellini', 'bellini martini', 'campari beer', 'negroni', 'espresso rumtini', 'espresso martini', 'gagliardo', 'garibaldi negroni', 'paloma', 'Spritz Veneziano'];
  americaList = ['a piece of ass', 'a splash of nash', 'alaska cocktail', 'americano ', 'apple cider punch', 'apple slammer', 'arizona stingers', 'arizona twister', 'army special', 'artillery punch', 'atlantic sun', 'boston sour', 'Bourbon sling', 'bourbon sour','brooklyn', 'california lemonade', 'california root beer', 'chicago fizz', 'fahrenheit 5000', 'godfather',  'iced coffee', 'jello shots', 'kentucky b and b', 'kentucky colonel'];
  scottishList = ['afternoon','baby guinness', 'balmoral', 'black and brown','flying scotchman','Sherry Eggnog', 'Scotch Sour','Scottish Highland Liqueur','Snake Bite'];

  unspecifiedDrink: Drink = {
    name: "",
    ingredients: [],
    measurements: [],
    instruction: "",
    img_url: ""
  };
  drinkList: Drink[] = [];

  drinkNames: string[] = [];

  mainStringDrink: string = "";

  mainDrink: Drink;
  dispDrinkAlt: Drink[] = [];
  
  //drinkJSONList: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.mainDrink = this.unspecifiedDrink;
    this.dispDrinkAlt = [this.unspecifiedDrink, this.unspecifiedDrink, this.unspecifiedDrink];
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
    //      this.getFromFetch();
    //this.setMainDrink();
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
            
            /*
            let tempDrink: Drink = {
              name: data.drinks[0].strDrink,
              ingredients: [data.drinks[0].strIngredient1],
              measurements: [data.drinks[0].strMeasure1],
              instruction: data.drinks[0].strInstructions
            }
            */
            
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
        drink.ingredients = this.extractIngredients(response);
        drink.name = value[0].strDrink;
        drink.measurements = this.extractMeasurement(response);
        drink.instruction = value[0].strInstructions;
        drink.img_url = value[0].strDrinkThumb;
      }
      //value[0].strIngredient1,

    );
    callback(drink);
  }

  extractSpec(value:Object, spec:string): string[]{
    let specList: string[];
    let index: number = 1;
    let specName: string;
    if(spec === "strIngredient") {
      specName = spec + index;
      //while()
      
    }
    return [];
  }


  extractIngredients(response: Object): string[] {   
    let ingredientList: string[] = [];
    let ing: string = "strIngredient";
    let i: number = 1;
    let ingName:string="";
    Object.entries(response).forEach(
      ([key, value]) => {
        ingName=value[0][ing+i];
        while(ingName !== null){
          console.log(ingName);
          i++;
          ingName=value[0][ing+i];
        }
      }
    )
    ingredientList = ingredientList.filter(v => v !== null);
    //console.log(ingredientList);
    return ingredientList;
  }
          /*
        ingredientList.push((value[0].strIngredient1));
        ingredientList.push((value[0].strIngredient2));
        ingredientList.push((value[0].strIngredient3));
        ingredientList.push((value[0].strIngredient4));
        ingredientList.push((value[0].strIngredient5));
        ingredientList.push((value[0].strIngredient6));
        ingredientList.push((value[0].strIngredient7));
        ingredientList.push((value[0].strIngredient8));
        ingredientList.push((value[0].strIngredient9));
        ingredientList.push((value[0].strIngredient10));
        */

  extractMeasurement(response: Object): string[] {
    let measurementList : string[] = [];
     
    Object.entries(response).forEach(
      ([key, value]) => {
        measurementList.push((value[0].strMeasure1));
        measurementList.push((value[0].strMeasure2));
        measurementList.push((value[0].strMeasure3));
        measurementList.push((value[0].strMeasure4));
        measurementList.push((value[0].strMeasure5));
        measurementList.push((value[0].strMeasure6));
        measurementList.push((value[0].strMeasure7));
        measurementList.push((value[0].strMeasure8));
        measurementList.push((value[0].strMeasure9));
        measurementList.push((value[0].strMeasure10));
      }
    )
    measurementList = measurementList.filter(v => v !== null);
    return measurementList;
  }
  

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

}

  /*
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

*/
/*
    console.log(tempList[0]);
    tempList.map(element => {
      console.log(JSON.stringify(element));
    })
  
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
*/
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

      /*

        let ingredientList: string[] = [];
    let ing: string;
    let i: number = 1;
    let isNull: boolean = false;
    while(!isNull && i < 16){
      ing = "strIngredient" +i;
      Object.entries(response).forEach(
        ([key, value]) => {
        
          // if(value[0].ing) {
           console.log(JSON.parse(ing)); 
        //  }
        }
      )      

      i++;
    }
    */