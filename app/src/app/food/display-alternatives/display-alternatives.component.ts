import { Component, OnInit, Input } from '@angular/core';
import { Dish } from './../../../util/dish';

@Component({
  selector: 'DisplayAlternatives',
  templateUrl: './display-alternatives.component.html',
  styleUrls: ['./display-alternatives.component.css']
})
export class DisplayAlternativesComponent implements OnInit {
  @Input() dishes!: Dish[];

  ngOnInit(): void {
    
  }
}
