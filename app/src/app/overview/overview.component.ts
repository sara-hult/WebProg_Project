import { ActivatedRoute, ParamMap } from '@angular/router';
import { Countries } from './../../util/countries';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @Input() country !: Countries
  countryDisplay: string;

  constructor(private route: ActivatedRoute) {
    this.countryDisplay = this.getCountryDisplayName(this.country)
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.setCountry(this.getCountryFromParams(params.get('country')));
    });
  };

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
