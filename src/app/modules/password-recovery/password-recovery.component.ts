import { Component, OnInit } from '@angular/core';
import { HTTPRequestService } from "../../services/httprequest.service";
import { MatDialog } from "@angular/material/dialog";
import { SharedDialogBoxComponent } from "../../shared/shared-dialog-box/shared-dialog-box.component";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  userName : string;
  spin : boolean = false;
  constructor(private httpSvc : HTTPRequestService,public dialog : MatDialog) { }

  ngOnInit() {
  }
  spinOn()
  {
    this.spin = true;
  }
  spinOff()
  {
    this.spin = false;
  }
  SendResetLink()
  {
    this.spinOn();
    this.httpSvc.get(`/api/v1/Manage/forgotpassword-request/${this.userName}`).subscribe((response : any) => {
      this.spinOff();
      if(response)
      {
        this.dialog.open(SharedDialogBoxComponent, {
          data : {
            value : response.message
          }
        });
      }
    }, error => {
      this.spinOff();
      this.dialog.open(SharedDialogBoxComponent, {
        data : {
          value : error.message
        }
      });
    });
  }
}
