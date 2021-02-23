import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDishComponent } from './display-dish.component';

describe('DisplayDishComponent', () => {
  let component: DisplayDishComponent;
  let fixture: ComponentFixture<DisplayDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
