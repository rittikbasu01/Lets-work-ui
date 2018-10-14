import { PasswordRecoveryModule } from './password-recovery.module';

describe('PasswordRecoveryModule', () => {
  let passwordRecoveryModule: PasswordRecoveryModule;

  beforeEach(() => {
    passwordRecoveryModule = new PasswordRecoveryModule();
  });

  it('should create an instance', () => {
    expect(passwordRecoveryModule).toBeTruthy();
  });
});
