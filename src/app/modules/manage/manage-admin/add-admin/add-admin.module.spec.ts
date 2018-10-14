import { AddAdminModule } from './add-admin.module';

describe('AddAdminModule', () => {
  let addAdminModule: AddAdminModule;

  beforeEach(() => {
    addAdminModule = new AddAdminModule();
  });

  it('should create an instance', () => {
    expect(addAdminModule).toBeTruthy();
  });
});
