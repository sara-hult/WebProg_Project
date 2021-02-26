import { map } from 'rxjs/operators';
import { Countries } from './../../util/countries';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'Landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']

})
export class LandingComponent implements OnInit {

  availableCountries: string[];
  chosenCountryString:string;
  chosenCountry:Countries = Countries.USA;

  constructor(private _router: Router) {
    this.availableCountries = this.getAvailableCountries();
    this.chosenCountryString = this.availableCountries[0];
  }

  ngOnInit(): void {
  }

  getAvailableCountries():string[] {
    return Object.keys(Countries);
  }

  submit(){
    let country:Countries | undefined = this.getCountryFromName(this.chosenCountryString);
    if(country !== undefined){
      this._router.navigate(["overview/", country]);
    }else{
      throw new Error("Country Undefined!");
    }
  }

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

  selectChangeHandler(event: any){
    if(event !== null){
      alert("Valt land: " + event.target.value)
    }
  }
}
