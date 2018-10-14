export class RegisterUserModel {
    
    UserName : string;
    Password : string;
    ConfirmPassword : string;
    UserEmail : string;
    FirstName : string;
    LastName : string;
    PhoneNumber : string;
    /**
     *
     */
    constructor(values : Object = {}) {
        
        Object.assign(this, values);
    }
}
