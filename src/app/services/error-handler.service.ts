import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material'
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(public snackbar : MatSnackBar) { }
  public UNAUHTORIZED_MESSAGE : string = 'Session Timed Out. Login Again';
  public BADREQUEST_MESSAGE : string = "";
  public INTERNALSERVER_MESSAGE : string = "";
  public HandleError(error : any)
  {
    switch(error.status)
    {
      case 401 :{
        this.snackbar.open(this.UNAUHTORIZED_MESSAGE,'close');
        break;
      }
      case 500 : {
        this.snackbar.open(this.INTERNALSERVER_MESSAGE, 'close');
        break;
      }
      case 400 : {
        this.snackbar.open(error.message, 'close');
        break;
      }            
      
    }
  }
}
