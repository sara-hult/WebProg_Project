import { ChooseCountryService } from './choose-country.service';
import { NavigationEnd, Router } from '@angular/router';
import { Countries } from './../util/countries';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Drink } from '../util/drink';
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

  constructor(private _router: Router, private chooseCountryService: ChooseCountryService, private drinkService : DrinkService) {
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
      localStorage.setItem("drinks", JSON.stringify(drinks));
      localStorage.setItem("mainDrink", JSON.stringify(this.randomChoiceFromArray(drinks)));
      this._router.navigate(["overview/", country]);
    })
  }

  atLanding():boolean{
    return this.url==="/"
  }

  generateDrinks(callback:Function = () => {}) { 
    this.drinkService.generateDrinks(this.correctCountry, callback);
  }

  randomChoiceFromArray<T>(array:T[]):T {
    return array[this.getRandomInt(array.length)];
  }

  getRandomInt(max:number): number {
   return Math.floor(Math.random() * Math.floor(max));
  }

}
 