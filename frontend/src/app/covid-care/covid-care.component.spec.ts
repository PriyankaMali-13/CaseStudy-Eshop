import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidCareComponent } from './covid-care.component';

describe('CovidCareComponent', () => {
  let component: CovidCareComponent;
  let fixture: ComponentFixture<CovidCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidCareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
