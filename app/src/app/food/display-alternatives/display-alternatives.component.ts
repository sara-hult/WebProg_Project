import { Dish } from './../../../util/dish';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'DisplayAlternatives',
  templateUrl: './display-alternatives.component.html',
  styleUrls: ['./display-alternatives.component.css']
})
export class DisplayAlternativesComponent implements OnInit {

  @Input() alternatives!:Dish[];

  constructor() { }


  ngOnInit(): void {
    
  }
}
