import { ManageBookingModule } from './manage-booking.module';

describe('ManageBookingModule', () => {
  let manageBookingModule: ManageBookingModule;

  beforeEach(() => {
    manageBookingModule = new ManageBookingModule();
  });

  it('should create an instance', () => {
    expect(manageBookingModule).toBeTruthy();
  });
});
