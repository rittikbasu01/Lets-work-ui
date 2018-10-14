export class SearchModel {
    
    FromDate : string;
    ToDtate : string;
    City : string;

    constructor(values : Object = {}) {
        Object.assign(this, values);        
    }
}
