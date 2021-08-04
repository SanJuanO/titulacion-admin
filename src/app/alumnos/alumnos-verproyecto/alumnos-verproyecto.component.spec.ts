import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosverproyectoComponent } from './alumnos-verproyecto.component';

describe('AlumnosverproyectoComponent', () => {
  let component: AlumnosverproyectoComponent;
  let fixture: ComponentFixture<AlumnosverproyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnosverproyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosverproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
