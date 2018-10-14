export class BookingReschedule
{
    public BookingId : string;
    public BookedFrom : string;
    public BookedTo : string;
    public TimeZoneId : string;

    constructor()
    {
        this.BookingId = "";
        this.BookedFrom = "";
        this.BookedTo = "";
        this.TimeZoneId = "";
    }
}