import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { HttpHeaders } from "@angular/common/http";
import { HTTPRequestService } from "../../services/httprequest.service";
import { MatDialog } from "@angular/material/dialog";
import { SharedDialogBoxComponent } from "../../shared/shared-dialog-box/shared-dialog-box.component";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  private id;
  spin : boolean = false;
  verifyForm : FormGroup;
  constructor(private route : ActivatedRoute, private fb : FormBuilder, private http : HTTPRequestService, private router : Router,public dialog : MatDialog) 
  {

  }
  generateHeaders() : HttpHeaders
  {
    return new HttpHeaders().set('Content-Type','application/json').set('Authorization',`Bearer ${this.id}`).set('Access-Control-Allow-Origin','*');
  }
  ngOnInit() {
    this.verifyForm = this.fb.group({
      verifyEmail : ['',[Validators.required,Validators.email]]
    });
    this.id = this.route.snapshot.paramMap.get('id');
  }
  get Email()
  {
    return this.verifyForm.get('verifyEmail') as FormControl;
  }
  spinOn()
  {
    this.spin = true;
  }
  spinOff()
  {
    this.spin = false;
  }
  onSubmit()
  {
    let email : string = this.Email.value;
    this.spinOn();
    this.http.put(`/api/v1/manage/verify-email/${email}`, email, this.generateHeaders()).subscribe( (response : any) => 
    {
      this.spinOff();
      localStorage.setItem('email',response.email);
      this.dialog.open(SharedDialogBoxComponent, {
        data : {
          value : response.message
        }
      });
      if(localStorage.getItem('id') && response.id && localStorage.getItem('id') === response.id)
        {
          this.router.navigate(['home']);
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
