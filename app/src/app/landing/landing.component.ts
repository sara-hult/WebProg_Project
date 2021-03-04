import { ChooseCountryService } from './../choose-country.service';
import { map } from 'rxjs/operators';
import { Countries } from './../../util/countries';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'Landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']

})
export class LandingComponent implements OnInit {
  availableCountries: string[];
  chosenCountryString:string;

  constructor(private _router: Router, private chooseCountryService: ChooseCountryService) {
    this.availableCountries = this.getAvailableCountries();
    this.chosenCountryString = this.availableCountries[0];
  }

  ngOnInit(): void {
  }


  submitCountry(){
    this.chooseCountryService.changeCountry(this.getCountryFromName(this.chosenCountryString) || Countries.USA);
  }

  getAvailableCountries():string[] {
    return Object.keys(Countries);
  }

  /* submit(){
    let country:Countries | undefined = this.getCountryFromName(this.chosenCountryString);
    if(country !== undefined){
      this._router.navigate(["overview/", country]);
    }else{
      throw new Error("Country Undefined!");
    }
  } */

  getCountryFromName(countryName: string): Countries | undefined {
    let country: Countries | undefined = undefined;
    Object.entries(Countries).forEach(
    ([key, value]) => {
      if(key === countryName){
        country = value;
      }
    }
  );
    return country;
  }

}
