import { TestBed, async, inject } from '@angular/core/testing';

import { ProfileAuthGuard } from './profile-auth.guard';

describe('ProfileAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileAuthGuard]
    });
  });

  it('should ...', inject([ProfileAuthGuard], (guard: ProfileAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
