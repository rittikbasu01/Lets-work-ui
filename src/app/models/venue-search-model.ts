export class VenueSearchModel
{
    NumberOfProjectors:number;
    SeatCapacity :number;
    NumberOfMicroPhones :number;
    RoomType :string;
    NumberOfPhones :number;
    WirelessNetwork :string;
    AirConditioningType :string;
    IsFoodVendingMachineAvailable :boolean;
    IsWaterVendingMachineAvailable :boolean;
    IsCoffeeVendingMachineAvailable :boolean;
    constructor(values : Object = {})
    {
        Object.assign(this, values);
    }    
}
