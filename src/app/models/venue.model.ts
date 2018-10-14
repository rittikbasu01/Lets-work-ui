import { VenueImage } from "../models/venue-image.model";

export  class  Venue  {
    VenueID: string;
    VenueName: string;
    VenueCity: string;
    VenueState:string;
    ContactNumber : string;
    InventoryID:string;
    NumberOfProjectors:number;
    SeatCapacity :number;
    NumberOfMicroPhones :number;
    Description :string;
    RoomType :string;
    NumberOfPhones :number;
    WirelessNetworkType :string;
    HourlyRate :number;
    AirConditioningType :string;
    IsFoodVendingMachineAvailable :boolean;
    IsWaterVendingMachineAvailable :boolean;
    IsCoffeeVendingMachineAvailable :boolean;
    IsActive:boolean;
    VenueImages : VenueImage[]
    constructor(Values:Object={})
    {
        Object.assign(this,Values);
    }
} 
     
    