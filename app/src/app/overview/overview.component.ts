import { ActivatedRoute, ParamMap } from '@angular/router';
import { Countries } from './../../util/countries';
import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '../../util/dish';
import { Drink } from '../../util/drink';
import { Movie } from '../../util/movie';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @Input() country !: Countries
  countryDisplay: string;

  initDish: Dish = {
    title: "Randomizing",
    readyInMinutes: 0,
    spoonacularScore: 0,
    pricePerServing: 0,
    image: "string",
    id: -1,
    sourceUrl: ""
  };

  initDrink: Drink = {
    name: '',
    ingredients: [],
    measurements: [],
    instruction: '',
    img_url: ''
  };

  placeholderMovie:Movie = {
    Poster:"Placeholder",
    Title:"Placeholder",
    Year:"Placeholder",
    imdbRating:"Placeholder",
    Director:"Placeholder",
    Plot:"Placeholder",
    imdbID:"Placeholder",
    Runtime:"Placeholder"
  };

  chosenDish: Dish = this.initDish;
  mainDrink : Drink = this.initDrink;
  chosenMovie: Movie = this.placeholderMovie;


  constructor(private route: ActivatedRoute) {
    this.countryDisplay = this.getCountryDisplayName(this.country)
   }

  ngOnInit(): void {
    this.chosenDish = this.fetchChosenDish();
    this.mainDrink = this.fetchMainDrink();
    this.chosenMovie = this.fetchChosenMovie();
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.setCountry(this.getCountryFromParams(params.get('country')));
    });
  };

  fetchChosenDish(): Dish{
    let dish: string|null = localStorage.getItem("chosenDish");
    if(dish){
      return JSON.parse(dish);
    }else{
      throw new Error("Could not find dish in local storage")
    }
  }

  fetchMainDrink() : Drink {
    let firstDrink: string|null = localStorage.getItem("mainDrink");
    if(firstDrink){
      return JSON.parse(firstDrink);
    }else{
      throw new Error("Could not find drink in local storage")
    }
  }

  fetchChosenMovie(): Movie{
    let movie: string|null = localStorage.getItem("chosenMovie");
    if(movie){
      return JSON.parse(movie)
    } else {
      throw new Error("Could not find chosen movie in local storage")
    }
  }

  setCountry(country:Countries):void{
    this.country = country;
    this.countryDisplay = this.getCountryDisplayName(country);
  }

  getCountryDisplayName(country:Countries):string{
    switch(country){
      case Countries.USA:
        return "USA";
      case Countries.Italy:
        return "Italien";
      case Countries.Scotland:
        return "Skottland";
    }
  }

  getCountryFromParams(country: string | null): Countries {
    if(country !== null){
        switch(country.toLowerCase()){
          case "american":
            return Countries.USA;
          case "italian":
            return Countries.Italy;
          case "scottish":
            return Countries.Scotland;
          default:
            throw new Error('404 Country not implemented')

        }
      }else{
        throw new Error('404 Ett land måste anges ex: american');
      }
  }

}
