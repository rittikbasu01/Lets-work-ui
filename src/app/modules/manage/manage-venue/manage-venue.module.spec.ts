import { ManageVenueModule } from './manage-venue.module';

describe('ManageVenueModule', () => {
  let manageVenueModule: ManageVenueModule;

  beforeEach(() => {
    manageVenueModule = new ManageVenueModule();
  });

  it('should create an instance', () => {
    expect(manageVenueModule).toBeTruthy();
  });
});
