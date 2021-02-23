import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodAlternativesComponent } from './food-alternatives.component';

describe('FoodAlternativesComponent', () => {
  let component: FoodAlternativesComponent;
  let fixture: ComponentFixture<FoodAlternativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodAlternativesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodAlternativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
