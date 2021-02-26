import { Component, Input, OnInit } from '@angular/core';
import { Drink } from './../../../util/drink';

@Component({
  selector: 'DisplayDrinkAlternatives',
  templateUrl: './display-drink-alternatives.component.html',
  styleUrls: ['./display-drink-alternatives.component.css']
})
export class DisplayDrinkAlternativesComponent implements OnInit {
  @Input() alternatives!: Drink[];
  constructor() { }

  ngOnInit(): void {
  }

}