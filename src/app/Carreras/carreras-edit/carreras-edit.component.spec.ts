import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasEditComponent } from './carrrtas-edit.component';

describe('CarrerasEditComponent', () => {
  let component: CarrerasEditComponent;
  let fixture: ComponentFixture<CarrerasEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarrerasEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrerasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
