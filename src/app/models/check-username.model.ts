export class CheckUserNameModel
{
    UserName : string;
    Id : string;
    
    constructor(values : Object = {}) {
    
        Object.assign(this,values);
    }
}