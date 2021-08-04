import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultadesVerComponent } from './facultades-ver.component';

describe('FacultadesVerComponent', () => {
  let component: FacultadesVerComponent;
  let fixture: ComponentFixture<FacultadesVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacultadesVerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultadesVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
