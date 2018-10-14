import { SharedDialogBoxModule } from './shared-dialog-box.module';

describe('SharedDialogBoxModule', () => {
  let sharedDialogBoxModule: SharedDialogBoxModule;

  beforeEach(() => {
    sharedDialogBoxModule = new SharedDialogBoxModule();
  });

  it('should create an instance', () => {
    expect(sharedDialogBoxModule).toBeTruthy();
  });
});
