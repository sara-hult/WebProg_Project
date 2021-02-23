import { Component, Input, OnInit } from '@angular/core';
import { Countries } from '../../util/countries';
import  exampleDish  from '../../util/exampleDish';
import  { trim }  from '../../util/dishTrimmer';
/*
Denna komponenten morsvarar själva matsidan.
Vi kommer att ha 2 subkomponenter: DiplayDish och DisplayAlternatives
Tar in ett objekt med alla maträtter tillhörande landet

Ska kunna hämta ut alla tillgängliga ids och lägga i en vektor
Ska kunna välja ut ids slumpvist utan dubletter


DisplayDish:
  Tar in objektet tillhörande den valda rätten.
  Ska hämta ut önskad information från objektet och visa det på lämpligt sätt
  ** Länka till ett riktigt recept

DisplayAlternatives
  En mindre lista med flera DisplayDish componenter
  Tar in tre stycken slumpvalda objekt med maträtter
*/
@Component({
  selector: 'FoodComponent',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  @Input() country!:Countries;
  dishIds = [];
  chosenID!: number;
  dish = exampleDish;

  constructor() { }

  ngOnInit(): void {
  }

}
