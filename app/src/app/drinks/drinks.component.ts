import { Component, OnInit, Input } from '@angular/core';
import { Countries } from '../../util/countries';

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
