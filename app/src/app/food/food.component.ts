import { Countries } from './../../util/countries';
import { FoodCacheReader } from './../../util/foodCacheReader';
import { runMode } from './../../util/runMode';
import { Dish } from './../../util/dish';
import { SpoonacularService } from './spoonacular.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
/*
Denna komponenten morsvarar själva matsidan.
Vi kommer att ha 2 subkomponenter: DiplayDish och DisplayAlternatives
Tar in ett objekt med alla maträtter tillhörande landet

Ska kunna hämta ut alla tillgängliga ids och lägga i en vektor
Ska kunna välja ut ids slumpvist utan dubletter


DisplayDish:
  Tar in objektet tillhörande den valda rätten.
  Ska hämta ut önskad information från objektet och visa det på lämpligt sätt
  ** Länka till ett riktigt recept

DisplayAlternatives
  En mindre lista med flera DisplayDish componenter
  Tar in tre stycken slumpvalda objekt med maträtter
*/
@Component({
  selector: 'FoodComponent',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  @Input() cuisine!:Countries;
  ids: number[] = [];

  initDish: Dish = {
    title: "Randomizing",
    readyInMinutes: 0,
    spoonacularScore: 0,
    pricePerServing: 0,
    image: "string",
    id: -1,
    sourceUrl: ""
  };

  dishes: Dish[] = [];


  // [Online/Offline] Bestämmer om rätter ska hämtas från api eller chachad data för att inte använda upp API-nyckel.
  mode:runMode = runMode.Offline;

  chosenID!: number;
  alternativeIDs: number[] = [];
  chosenDish: Dish;
  chosenAlternatives: Dish[] = [];

  constructor(private SpoonacularService: SpoonacularService, private route: ActivatedRoute) {
    this.chosenDish = this.initDish;
    this.chosenAlternatives = [this.initDish, this.initDish, this.initDish]
  }

  ngOnInit(): void {
   this.route.paramMap.subscribe((params: ParamMap) => {
        this.cuisine = this.getCuisine(params.get('cuisine'));
        this.generateDishes(this.mode, this.cuisine, ()=>{
        this.randomizeDish();
        this.randomiseAlternatives(3);
    });
  });

  }

  getCuisine(cuisine: string | null): Countries {
      if(cuisine !== null){
        switch(cuisine){
          case "american":
            return Countries.USA;
          default:
            throw new Error('404 Country not implemented')

        }
      }else{
        throw new Error('404 Ett land måste anges ex: american');
      }
  }

  /*
  Hämtar alla rätter som tillhör det givna landet.
  Källan bestäms av mode som antingen är "online" eller "offline"
  De inre metoderna ändrar objektets attribut
  Callback gör så att vi kan slumpa maträtterna efter att alla rätter har laddats in
  */
  generateDishes(mode:runMode, cuisine:Countries, callback:Function = ()=>{}){
    //(Conditional (ternary)):  boolean?  <om true>:<om false>
    mode? this.generateDishesAPI(cuisine, callback): this.generateDishesCache(cuisine, callback); // Generar tillgängliga rätter baserat på läget applikationen körs i
  }

  /*
  Väljer en ny rätt från de inladdade rätterna
  Anropas av knapp
  */
  randomizeDish() {
    this.chosenID = this.randomChoiceFromArray(this.ids);
    this.chosenDish = this.getDishFromArray(this.chosenID, this.dishes)
  }

  /*
  Laddar in alla rätter som tillhär landet från cachen
  anrop av callback gör så att slumpningen går igång
   */
  generateDishesCache(cuisine:Countries, callback:Function = ()=>{}) {
    new FoodCacheReader(this.cuisine, (builtReader:FoodCacheReader)=>{
      this.dishes = builtReader.getDishes();
      this.ids = builtReader.getIds();
      callback()
    })
  }

  /*
  Byter vilken källa datan hämtas ifrån
  Slumpar därefter om vald rätt och valda alternativ
   */
  toggleFetchMode(){
    this.mode? this.mode=runMode.Offline : this.mode=runMode.Online;
     this.generateDishes(this.mode, this.cuisine, ()=>{
      this.randomizeDish();
      this.randomiseAlternatives(3);
    });
  }

  /*
  Returnerar rätten som har det valda IDt
  Om det inte finns någon rätt med angivet så kastas ett fel.
  */
 getDishFromArray(id: number, dishes: Dish[]): Dish {
   let dish;
   dish = dishes.find((dish)=> dish.id === id)
   if(dish === undefined){
    throw new Error("Dish not found in array");
   }
   return dish;
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

  /*
  Hämtar in alla maträtter som tillhör landet från APIn.
  */
  public generateDishesAPI(cuisine:Countries, callback:Function = ()=>{}):void{
    let placeHolderDish:Dish = {
      title: "Fetching from API...",
      readyInMinutes: 0,
      spoonacularScore: 0,
      pricePerServing: 0,
      image: "",
      id: -1,
      sourceUrl: ""
    }
    this.chosenDish = placeHolderDish;
    this.chosenAlternatives = [placeHolderDish, placeHolderDish, placeHolderDish]

    this.SpoonacularService.getCuisineDetails(cuisine) // Hämtar all information baserat på land
      .subscribe(
        (response) => {                           //next() callback
          this.extractIds(response.results, (ids:number[])=>{
            this.ids = ids;
            this.saveDishes(ids, ()=>{
              callback()
            });
          })
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        },
        () => {})                                   //complete() callback

  }

  /*
  Sparar alla rätter vars id skickas in som argument.
  Rätterna hämtas ifrån APIn
  */
  public saveDishes(ids:number[], callback:Function = ()=>{}):void{
    let dishID:number = -1;
    this.SpoonacularService.getFromIds(ids.toString())
      .subscribe(
        (response) => {                           //next() callback
          this.extractDishes(response, (dishes:Dish[])=>{
            this.dishes = dishes;
            callback();
          });
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        },
        () => {})                                  //complete() callback

  }

  /*
  Anropar angiven callback med alla rätter som finns i en response
  */
  extractDishes(response: Object, callback:Function = ()=>{}): void {
    let dishes: Dish[] = [];
     Object.entries(response).forEach(
      ([key, value]) => {
        dishes.push(value);
      }
    );
    callback(dishes);
  }

  /*
  Anropar angiven callback med alla IDs som finns i en response
  */
  extractIds(response:Object, callback:Function = ()=>{}):void{
    let ids:number[] = [];
    Object.entries(response).forEach(
      ([key, value]) => {
        ids.push(value.id);
      }
    );
    callback(ids)
  }

  /*
  Hanterar ramdomiseringen av alternativa rätter
  */
  randomiseAlternatives(nbrAlternatives: number) {
    this.chosenAlternatives = [];
    let candidates: Dish[] = this.dishes.filter((dish)=>dish.id !== this.chosenDish.id);
    let k = Math.min(nbrAlternatives, candidates.length);
    let dish: Dish;

    for (let i = 0; i < k; i++) {
      dish = this.randomChoiceFromArray(candidates);
      candidates = candidates.filter(obj => obj !== dish); // funkar detta? ska det vara dish.något?
      this.chosenAlternatives.push(dish);
    }
  }

  /*
  Byter ut den valda rätten mot den rätt som har angivet id
  Anropas med hjälp av DisplayAlternatives output
  */
  switchToAlternative(id:number){
    this.chosenDish = this.dishes.filter((alternative:Dish)=>alternative.id === id)[0] || this.chosenDish;
  }

}
