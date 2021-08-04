import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosiaEditComponent } from './usuarios-edit.component';

describe('ConvocatoriaEditComponent', () => {
  let component: UsuariosiaEditComponent;
  let fixture: ComponentFixture<UsuariosiaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosiaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosiaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
