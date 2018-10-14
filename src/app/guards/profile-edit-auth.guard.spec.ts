import { TestBed, async, inject } from '@angular/core/testing';

import { ProfileEditAuthGuard } from './profile-edit-auth.guard';

describe('ProfileEditAuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileEditAuthGuard]
    });
  });

  it('should ...', inject([ProfileEditAuthGuard], (guard: ProfileEditAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
