export class ChangePasswordModel
{
    
    OldPassword : string;
    NewPassword : string;
    ConfirmPassword : string;

    constructor(values : Object = {}) {
       Object.assign(this,values);
    }
}