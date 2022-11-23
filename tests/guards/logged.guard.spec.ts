import { TestBed } from '@angular/core/testing';

import { LoggedGuard } from '../../src/app/guards/logged.guard';

describe('LoggedGuard', () => {
  let guard: LoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
