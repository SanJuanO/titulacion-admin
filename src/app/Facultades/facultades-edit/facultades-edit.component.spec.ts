import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultadesEditComponent } from './facultades-edit.component';

describe('FacultadesEditComponent', () => {
  let component: FacultadesEditComponent;
  let fixture: ComponentFixture<FacultadesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacultadesEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultadesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
