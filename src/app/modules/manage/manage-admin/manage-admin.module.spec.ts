import { ManageAdminModule } from './manage-admin.module';

describe('ManageAdminModule', () => {
  let manageAdminModule: ManageAdminModule;

  beforeEach(() => {
    manageAdminModule = new ManageAdminModule();
  });

  it('should create an instance', () => {
    expect(manageAdminModule).toBeTruthy();
  });
});
