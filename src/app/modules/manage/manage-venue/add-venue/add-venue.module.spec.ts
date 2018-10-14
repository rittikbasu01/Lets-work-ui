import { AddVenueModule } from './add-venue.module';

describe('AddVenueModule', () => {
  let addVenueModule: AddVenueModule;

  beforeEach(() => {
    addVenueModule = new AddVenueModule();
  });

  it('should create an instance', () => {
    expect(addVenueModule).toBeTruthy();
  });
});
