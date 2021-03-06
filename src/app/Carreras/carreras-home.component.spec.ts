import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasComponent } from './carreras-home.component';

describe('StudentProjectsComponent', () => {
  let component: CarrerasComponent;
  let fixture: ComponentFixture<CarrerasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarrerasComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
