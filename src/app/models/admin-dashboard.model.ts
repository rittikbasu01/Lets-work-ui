export class AdminDashboard
{
    public AdminCount : number;
    public BookingCount : number;
    public VenueCount : number;
    public VenueBookingMapping :  Array<VenueBookingFrequencyMapping>;

    constructor()
    {
        this.AdminCount = 0;
        this.BookingCount = 0;
        this.VenueCount = 0;
        this.VenueBookingMapping = new Array<VenueBookingFrequencyMapping>();
    }
}

export class VenueBookingFrequencyMapping
{
    public VenueName : string;
    public VenueCity : string;
    public BookingCount : number;
    constructor()
    {
        this.VenueName = "";
        this.VenueCity = "";
        this.BookingCount = 0;
    }
}