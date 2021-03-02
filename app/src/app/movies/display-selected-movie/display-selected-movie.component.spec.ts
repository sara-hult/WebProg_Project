import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySelectedMovieComponent } from './display-selected-movie.component';

describe('DisplaySelectedMovieComponent', () => {
  let component: DisplaySelectedMovieComponent;
  let fixture: ComponentFixture<DisplaySelectedMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySelectedMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySelectedMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
