import { map } from 'rxjs/operators';
import { Countries } from './../../util/countries';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'Landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  availableCountries: string[];
  chosenCountry:string = "USA";


  constructor() {
    this.availableCountries = this.getAvailableCountries();
  }

  ngOnInit(): void {
  }


  getAvailableCountries():string[] {
    return Object.keys(Countries);
  }


  selectChangeHandler(event: any){
    if(event !== null){
      alert("Valt land: " + event.target.value)
    }
  }

}
