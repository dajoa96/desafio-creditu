import { TestBed } from '@angular/core/testing';

import { LoginGuard } from '../../src/app/guards/login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginGuard);
  });

  test('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
