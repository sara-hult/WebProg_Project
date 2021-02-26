import { CountryListener } from './../util/countryListener';
import { Countries } from './../util/countries';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChooseCountryService {

  private newCountrySource = new Subject<Countries>();

  countryChanged$ = this.newCountrySource.asObservable();

  changeCountry(country: Countries){
    this.newCountrySource.next(country);
  }

}
