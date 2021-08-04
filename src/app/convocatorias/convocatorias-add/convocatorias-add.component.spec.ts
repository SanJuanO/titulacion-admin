import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriasAddComponent } from './convocatorias-add.component';

describe('ConvocatoriasAddComponent', () => {
  let component: ConvocatoriasAddComponent;
  let fixture: ComponentFixture<ConvocatoriasAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvocatoriasAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvocatoriasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
