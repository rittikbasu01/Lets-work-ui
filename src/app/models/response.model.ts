export class ResponseModel
{
    
    access_token : string;
    role : string;
    id : string;
    email : string;
    error : string;
    expires : string;
    userName : string;
    constructor(values : Object = {})
    {
        Object.assign(this, values);

    }
}
