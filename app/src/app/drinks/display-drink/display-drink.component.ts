import { Component, Input, OnInit } from '@angular/core';
import { Drink } from './../../../util/drink';

@Component({
  selector: 'DisplayDrinkComponent',
  templateUrl: './display-drink.component.html',
  styleUrls: ['./display-drink.component.css']
})
export class DisplayDrinkComponent implements OnInit {
  @Input() drink!: Drink
  constructor() { }

  ngOnInit(): void {
  }

}
