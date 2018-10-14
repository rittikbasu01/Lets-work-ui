import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class HTTPRequestService {

  //readonly urlHost : string = "https://letsworkdotnetjul18dev.azurewebsites.net";
  readonly urlHost : string = "https://letsworkdotnetjul18qa.azurewebsites.net";
  //readonly urlHost : string = "http://localhost:59095";
  constructor(private http : HttpClient) 
  {

  }

  //Generic Methods
  public post<T>(url: string, data: string, httpHeader: HttpHeaders): Observable<T> {

    let apiEndpoint = `${this.urlHost}${url}`;

    return this.http.post<T>(apiEndpoint, data, {
      headers: httpHeader
    });
  }
  public postFile<T>(url: string, data: FormData, httpHeader: HttpHeaders): Observable<T> {

    let apiEndpoint = `${this.urlHost}${url}`;
    return this.http.post<T>(apiEndpoint, data, { headers: httpHeader });
  }
  public get<T>(url: string, httpHeader?: HttpHeaders): Observable<T> {
    return this.http.get<T>(`${this.urlHost}${url}`, { headers: httpHeader });
  }
  public getAPI<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
  public put<T>(url: string, data: string, httpHeader: HttpHeaders): Observable<T> 
  {
    return this.http.put<T>(`${this.urlHost}${url}`, data, { headers: httpHeader });
  }
  public putFile(url: string, data: FormData, httpHeader: HttpHeaders): Observable<any> 
  {
    return this.http.put(`${this.urlHost}${url}`, data, { headers: httpHeader });
  }
  public delete(url: string, httpHeader?: HttpHeaders): Observable<any> 
  {
    return this.http.delete(`${this.urlHost}${url}`, { headers: httpHeader });
  }
}
