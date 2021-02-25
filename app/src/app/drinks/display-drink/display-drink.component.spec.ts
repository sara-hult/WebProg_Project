import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDrinkComponent } from './display-drink.component';

describe('DisplayDrinkComponent', () => {
  let component: DisplayDrinkComponent;
  let fixture: ComponentFixture<DisplayDrinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDrinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
