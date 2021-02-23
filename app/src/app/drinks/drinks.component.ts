import { Component, OnInit, Input } from '@angular/core';
import { Countries } from '../../util/countries';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {
  @Input() country!: Countries;
  constructor() { }

  ngOnInit(): void {
  } 

}

//document.getElementsByClassName("css-1wo4jfn")[0].outerText För att få dryckesinfo från systembolaget