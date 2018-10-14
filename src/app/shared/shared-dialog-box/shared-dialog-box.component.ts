import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from "@angular/core";
@Component({
  selector: 'app-shared-dialog-box',
  templateUrl: './shared-dialog-box.component.html',
  styleUrls: ['./shared-dialog-box.component.css']
})
export class SharedDialogBoxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit() {
  }

}
