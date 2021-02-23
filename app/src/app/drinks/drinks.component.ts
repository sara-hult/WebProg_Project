import { Component, OnInit, Input } from '@angular/core';
import { Countries } from '../../util/countries';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css'],

})
export class DrinksComponent implements OnInit {
  @Input() country!: Countries;
  hej: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Simple GET request with response type <any> hejjeheje
    this.http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=campari beer').subscribe(data => {
      console.log(data);
    })
  }
}

//document.getElementsByClassName("css-1wo4jfn")[0].outerText För att få dryckesinfo från systembolaget hejehjeje

