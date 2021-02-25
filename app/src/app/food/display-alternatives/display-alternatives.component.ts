import { Dish } from './../../../util/dish';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'DisplayAlternatives',
  templateUrl: './display-alternatives.component.html',
  styleUrls: ['./display-alternatives.component.css']
})
export class DisplayAlternativesComponent implements OnInit {

  @Input() alternatives!:Dish[];
  @Output() switchDishEvent = new EventEmitter<number>();

  switchChosenDish(id : number){
    this.switchDishEvent.emit(id);
  }

  constructor() { }


  ngOnInit(): void {

  }
}
