export class BookDetails {
    BookedFrom: string;
    BookedTo: string;
    TimeZoneId : string;
    UserID: string;
    VenueID: string;
    UserEmail: string;
    Price: string;
    ReferralCode : string;
    constructor(values : Object = {})
    {
       
        Object.assign(this, values);
    }
}

