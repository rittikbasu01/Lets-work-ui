import { Pipe, PipeTransform } from '@angular/core';
import { Venue } from "../models/venue.model";

@Pipe({
  name: 'venueSearchFilter'
})
export class VenueSearchFilterPipe implements PipeTransform {

  transform(venues : Venue[], searchText: string, 
    roomType : string, acType : string, 
    foodVendingMachine : boolean, waterVendingMachine : boolean, coffeeVendingMachine : boolean, wifiNetworkType : string): any {
    
    if(!searchText && !roomType && !acType && !foodVendingMachine && !waterVendingMachine && !coffeeVendingMachine && !wifiNetworkType)
    {
      return venues;
    }

    return venues.filter(v => {

      
      if(searchText && v.VenueName.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
      {
        return true;
      }
      if(roomType && v.RoomType === roomType)
      {
        return true;
      }
      if(acType && v.AirConditioningType === acType)
      {
        return true;
      }
      if(foodVendingMachine && v.IsFoodVendingMachineAvailable)
      {
        return true;
      }
      if(waterVendingMachine && v.IsWaterVendingMachineAvailable)
      {
        return true;
      }
      if(coffeeVendingMachine && v.IsCoffeeVendingMachineAvailable)
      {
        return true;
      }
    
      if(wifiNetworkType && v.WirelessNetworkType.includes(wifiNetworkType))
      {
        
        return true;
      }
    });
  }

}
