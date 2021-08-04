import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultadesAddComponent } from './facultades-add.component';

describe('FacultadesAddComponent', () => {
  let component: FacultadesAddComponent;
  let fixture: ComponentFixture<FacultadesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacultadesAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultadesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
