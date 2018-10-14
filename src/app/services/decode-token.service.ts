import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from "../models/token.model";
@Injectable({
  providedIn: 'root'
})
export class DecodeTokenService {

  constructor() { }
  public decodeToken(token : string) : Token
  {
    const helper = new JwtHelperService();
    
    const decodedToken = helper.decodeToken(token);
    
    let tokenData : Token = new Token();
    tokenData.email = decodedToken["sub"];
    tokenData.id = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    
    return tokenData;
  }
}
