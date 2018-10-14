import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";

@Component({
  selector: 'app-confirm-exit',
  templateUrl: './confirm-exit.component.html',
  styleUrls: ['./confirm-exit.component.css']
})
export class ConfirmExitComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmExitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onOkClick()
    {
      this.dialogRef.close();
      return true;
    }
    onCancelClick()
    {
      this.dialogRef.close();
      return false;
    }
  ngOnInit() {
  }

}
