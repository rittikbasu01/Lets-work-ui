import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  
  source : string ;
  constructor() { 
    
  }
  set SetRequestSource(values)
  {
    this.source = values;
  }
  get GetRequestSource()
  {
    return this.source;
  }
}
