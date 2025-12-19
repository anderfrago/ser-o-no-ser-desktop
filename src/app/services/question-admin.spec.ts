import { TestBed } from '@angular/core/testing';

import { QuestionAdmin } from './question-admin';

describe('QuestionAdmin', () => {
  let service: QuestionAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
