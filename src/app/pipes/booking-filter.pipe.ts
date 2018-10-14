import { PipeTransform,Pipe} from "@angular/core";
import { ShowAllBookingModel } from "../models/show-all-booking.model";
//write import statement for BookingDetailsModel
@Pipe({
    name:'BookingFilterPipe'
})
export class BookingFilterPipe implements PipeTransform
{
    transform(Bookings:ShowAllBookingModel[],BookingID:string):ShowAllBookingModel[]
    {
        
        if(!BookingID)
        return Bookings;
        
        return Bookings.filter( it => {
        
        return it.BookingID
        .toLowerCase().includes(BookingID.toLowerCase());
    });
}
} 
