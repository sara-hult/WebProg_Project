import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {
  @Input() country: country;
  constructor() { }

  ngOnInit(): void {
  } 

}
