import { Component, OnInit, Input } from '@angular/core';
import { Countries } from '../../util/countries';
import { Cocktail } from './../../util/cocktail';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css'],

})
export class DrinksComponent implements OnInit {
  @Input() country!: Countries;
  
  cocktail: Cocktail = {
    name: "",
    ingredients: [],
    measurements: [],
    instruction: ""
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Simple GET request with response type <any> hejjeheje
    let cocktailName = "campari beer";
    this.http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + cocktailName).subscribe(data => {
      console.log(data);
      this.cocktail.name = data.drinks[0].strDrink;
      this.cocktail.ingredients[0] = data.drinks[0].strIngredient1;
      this.cocktail.measurements[0] = data.drinks[0].strMeasure1;
      this.cocktail.instruction = data.drinks[0].strInstructions;
      console.log("-------Skriver ut cocktailobjektet i ngOninit------");
      console.log(this.cocktail);
      console.log("------------------------------");
    })
  }
}

//document.getElementsByClassName("css-1wo4jfn")[0].outerText För att få dryckesinfo från systembolaget hejehjejehejehejeheh

