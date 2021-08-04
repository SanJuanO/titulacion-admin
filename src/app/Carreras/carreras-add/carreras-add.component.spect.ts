import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasAddComponent } from './carreras-add.component';

describe('CarrerasAddComponent', () => {
  let component: CarrerasAddComponent;
  let fixture: ComponentFixture<CarrerasAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarrerasAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrerasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
