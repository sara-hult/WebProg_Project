import { ChooseCountryService } from './choose-country.service';
import { NavigationEnd, Router } from '@angular/router';
import { Countries } from './../util/countries';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dish } from 'src/util/dish';
import { SpoonacularService } from './food/spoonacular.service';
import { runMode } from 'src/util/runMode';
import { FoodCacheReader } from '../util/foodCacheReader';
import { FoodCreationService } from './food-creation.service';

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

  runMode: runMode = runMode.Offline;
  dishes: Dish[] = [];

  constructor(private _router: Router, private chooseCountryService: ChooseCountryService, private foodCreationService: FoodCreationService) {
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
    this.generateDishes((dishes: Dish[])=>{
      localStorage.setItem("dishes", JSON.stringify(dishes))
      localStorage.setItem("chosenDish", JSON.stringify(this.randomChoiceFromArray(dishes)))
    });
    this._router.navigate(["overview/", country]);
  }

  atLanding():boolean{
    return this.url==="/"
  }

   /*
  Hämtar alla rätter som tillhör det givna landet.
  Källan bestäms av mode som antingen är "online" eller "offline"
  De inre metoderna ändrar objektets attribut
  Callback gör så att vi kan slumpa maträtterna efter att alla rätter har laddats in
  */
  generateDishes(callback:Function = ()=>{}){
    //(Conditional (ternary)):  boolean?  <om true>:<om false>
    this.runMode? this.foodCreationService.generateDishesAPI(this.correctCountry, callback): this.foodCreationService.generateDishesCache(this.correctCountry, callback); // Generar tillgängliga rätter baserat på läget applikationen körs i
  }

  /*
  Returnerar ett objekt från den givna vektorn
  */
  randomChoiceFromArray(array:any[]):any {
    return array[this.getRandomInt(array.length)]
  }

  getRandomInt(max:number):number {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
