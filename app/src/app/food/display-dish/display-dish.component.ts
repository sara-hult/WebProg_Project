import { Dish } from './../../../util/dish';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'DisplayDish',
  templateUrl: './display-dish.component.html',
  styleUrls: ['./display-dish.component.css']
})
export class DisplayDishComponent implements OnInit {
  @Input() dish!: Dish;
  name!: string;
  cookTime!: number;
  points!:number;
  price!: number;
  img!: string;

  constructor() { 
    
  }

  ngOnInit(): void {
    this.name = this.dish.title;
    this.cookTime = this.dish.readyInMinutes;
    this.points = this.dish.spoonacularScore;
    this.price = this.dish.pricePerServing;
    this.img = this.dish.image;
  }



}
