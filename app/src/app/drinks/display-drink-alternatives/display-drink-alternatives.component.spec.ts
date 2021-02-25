import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDrinkAlternativesComponent } from './display-drink-alternatives.component';

describe('DisplayDrinkAlternativesComponent', () => {
  let component: DisplayDrinkAlternativesComponent;
  let fixture: ComponentFixture<DisplayDrinkAlternativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDrinkAlternativesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDrinkAlternativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
