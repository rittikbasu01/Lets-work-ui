export class SignInModel {

    UserName : string;
    Password : string;

    /**
     *
     */
    constructor(values : Object = {}) {
        
        Object.assign(this, values);
    }
}
