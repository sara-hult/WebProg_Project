import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  @Input() country!:Countries
  
  constructor() { }

  ngOnInit(): void {
  }

}
