import { Dish } from './../../../util/dish';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'DisplayDish',
  templateUrl: './display-dish.component.html',
  styleUrls: ['./display-dish.component.css']
})
export class DisplayDishComponent implements OnInit {
  @Input() dish!: Dish;

  constructor() {
  }

  ngOnInit(): void {
  }



}
