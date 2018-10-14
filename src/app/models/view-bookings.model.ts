export class ViewBookingsModel
{
    BookingFromDate:string;
    BookingToDate:string;
    VenueName:string;
    BookingID:string;
    UserID : string;
    constructor(Values:Object={})
    {
        Object.assign(this,Values);
    }
}