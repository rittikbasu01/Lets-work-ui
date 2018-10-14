export class BookingSearchModel
{
    UserId : string;
    Date : string;

    constructor(values : Object = {})
    {
        Object.assign(this, values);
    }
}