import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosAddComponent } from './alumnos-add.component';

describe('AlumnosAddComponent', () => {
  let component: AlumnosAddComponent;
  let fixture: ComponentFixture<AlumnosAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnosAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
