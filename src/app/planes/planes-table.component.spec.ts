import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesComponent } from './planes-table.component';

describe('StudentProjectsComponent', () => {
  let component: PlanesComponent;
  let fixture: ComponentFixture<PlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
