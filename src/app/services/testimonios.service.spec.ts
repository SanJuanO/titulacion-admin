import { TestBed } from '@angular/core/testing';

import { TestimoniosServices } from './testimonios.service';

describe('TestimoniosServices', () => {
  let testimonios: TestimoniosServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    testimonios = TestBed.inject(TestimoniosServices);
  });

  it('should be created', () => {
    expect(testimonios).toBeTruthy();
  });
});
