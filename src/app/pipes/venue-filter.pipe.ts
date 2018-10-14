import { PipeTransform,Pipe} from "@angular/core";
import { Venue } from "../models/venue.model";
@Pipe({
    name:'VenueFilterPipe'
})
export class VenueFilterPipe implements PipeTransform
{

    transform(venues:Venue[],searchText:string,searchCity:string):Venue[]
    {
       
        if(!searchText && !searchCity)
            return venues;
        if(searchText)
            searchText = searchText.trim();
        if(searchCity)
            searchCity = searchCity.trim();
        return venues.filter( it => {
            if (searchText && it.VenueName.toLowerCase().indexOf(searchText.toLowerCase()) === -1){
                return false;
            }
            if (searchCity && it.VenueCity.toLowerCase().indexOf(searchCity.toLowerCase()) === -1){
                return false;
            }
            return true;
        }
         );
      
    }
}


