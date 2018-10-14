import { Router } from "@angular/router";

export class Shared
{
    /**
     *
     */
    private router : Router
    constructor(values : Object = {}) {

        Object.assign(this, values);
    }
    logout()
    {
        if(localStorage.getItem('access_token') || localStorage.getItem('role') || localStorage.getItem('id'))
        {
            localStorage.clear();
            this.router.navigate(['home']);
        }
    }
}