import { VerifyEmailModule } from './verify-email.module';

describe('VerifyEmailModule', () => {
  let verifyEmailModule: VerifyEmailModule;

  beforeEach(() => {
    verifyEmailModule = new VerifyEmailModule();
  });

  it('should create an instance', () => {
    expect(verifyEmailModule).toBeTruthy();
  });
});
