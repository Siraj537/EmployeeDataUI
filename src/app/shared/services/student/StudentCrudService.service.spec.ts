import { TestBed } from '@angular/core/testing';

import { StudentCrudService } from './StudentCrudService.service';

describe('ApiService', () => {
  let service: StudentCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
