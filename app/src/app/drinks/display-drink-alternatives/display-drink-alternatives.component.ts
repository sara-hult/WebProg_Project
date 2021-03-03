import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Drink } from './../../../util/drink';

@Component({
  selector: 'DisplayDrinkAlternatives',
  templateUrl: './display-drink-alternatives.component.html',
  styleUrls: ['./display-drink-alternatives.component.css']
})
export class DisplayDrinkAlternativesComponent implements OnInit {
  @Input() alternatives!: Drink[];
  @Output() newDrinkEvent = new EventEmitter<string>();

  switchMainDrink(name : string){
    console.log(name);
    this.newDrinkEvent.emit(name);
  }

  constructor() { }

  ngOnInit(): void {
  }

}