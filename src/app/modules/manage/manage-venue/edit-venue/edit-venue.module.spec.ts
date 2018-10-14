import { EditVenueModule } from './edit-venue.module';

describe('EditVenueModule', () => {
  let editVenueModule: EditVenueModule;

  beforeEach(() => {
    editVenueModule = new EditVenueModule();
  });

  it('should create an instance', () => {
    expect(editVenueModule).toBeTruthy();
  });
});
