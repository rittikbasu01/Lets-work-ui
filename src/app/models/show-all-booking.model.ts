export class ShowAllBookingModel {

    BookingID : string;
    BookingFromDate : string;
    BookingToDate : string;
    UserName : string;
    Email : string;
    VenueName : string;
    VenueCity : string;
    /**
     *
     */
    constructor(values : Object = {}) {
        Object.assign(this, values);
    }
}
