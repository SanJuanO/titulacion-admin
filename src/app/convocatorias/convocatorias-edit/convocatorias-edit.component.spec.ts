import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriasEditComponent } from './convocatorias-edit.component';

describe('ConvocatoriasEditComponent', () => {
  let component: ConvocatoriasEditComponent;
  let fixture: ComponentFixture<ConvocatoriasEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvocatoriasEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvocatoriasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
