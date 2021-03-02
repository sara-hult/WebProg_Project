import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMovieAlternativesComponent } from './display-movie-alternatives.component';

describe('DisplayMovieAlternativesComponent', () => {
  let component: DisplayMovieAlternativesComponent;
  let fixture: ComponentFixture<DisplayMovieAlternativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMovieAlternativesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMovieAlternativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
