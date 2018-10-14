export class UserProfileModel
{
    UserName:string;
    FirstName:string;
    LastName:string;
    PhoneNumber:string;
    ProfileImageID;string;
    ProfileImageUrl:string;
    EmailConfirmed : boolean;
    constructor(values : Object = {})
    {
      Object.assign(this, values);
    }
}