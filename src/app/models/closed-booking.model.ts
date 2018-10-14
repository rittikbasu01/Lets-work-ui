export class ClosedBookingModel
{
    UserId : string;
    Date : string;

    
    constructor(values : Object = {}) {
        
        Object.assign(this, values);
    }
}