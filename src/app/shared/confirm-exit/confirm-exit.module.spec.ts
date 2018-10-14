import { ConfirmExitModule } from './confirm-exit.module';

describe('ConfirmExitModule', () => {
  let confirmExitModule: ConfirmExitModule;

  beforeEach(() => {
    confirmExitModule = new ConfirmExitModule();
  });

  it('should create an instance', () => {
    expect(confirmExitModule).toBeTruthy();
  });
});
