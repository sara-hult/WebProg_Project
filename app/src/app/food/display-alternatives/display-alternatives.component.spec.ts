import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAlternativesComponent } from './display-alternatives.component';

describe('DisplayAlternativesComponent', () => {
  let component: DisplayAlternativesComponent;
  let fixture: ComponentFixture<DisplayAlternativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAlternativesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAlternativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
