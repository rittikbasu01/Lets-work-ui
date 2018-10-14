export class ForgotPasswordModel
{
    UserName : string;
    NewPassword : string;
    ConfirmPassword : string;

    constructor(values : Object = {}) {

        Object.assign(this,values);
    }
}