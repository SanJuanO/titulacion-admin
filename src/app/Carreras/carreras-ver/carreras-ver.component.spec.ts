import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasVerComponent } from './carreras-ver.component';

describe('CarrerasVerComponent', () => {
  let component: CarrerasVerComponent;
  let fixture: ComponentFixture<CarrerasVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarrerasVerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrerasVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
