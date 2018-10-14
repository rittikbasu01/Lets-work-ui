import { Component, OnInit } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { ViewChild, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { HTTPRequestService } from "../../../services/httprequest.service";
import { HttpHeaders } from "@angular/common/http";
import { AdminDashboard } from "src/app/models/admin-dashboard.model";
import { SharedDialogBoxComponent } from "../../../shared/shared-dialog-box/shared-dialog-box.component";
import { LogoutService } from "../../../shared/logout.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['Venue Name', 'Venue City', 'BookingCount'];
  TABLE_DATA_SOURCE: any[] = [];

  dataSource;
  adminDashboard: AdminDashboard;
  constructor(private ref : ChangeDetectorRef, private httpSvc: HTTPRequestService, 
              public dialog: MatDialog, private logoutSvc : LogoutService, private router : Router) {

                this.httpSvc.get(`/api/v1/profile/admin-dashboard`, this.genHeaders())
                .subscribe((data: AdminDashboard) => {
                  if (data) {
                    this.adminDashboard = data;
                    this.TABLE_DATA_SOURCE = this.adminDashboard.VenueBookingMapping;
                    this.dataSource = new MatTableDataSource(this.TABLE_DATA_SOURCE);
                   
                  }
                }, error => {
                  debugger;
                  if (error.status == 401) {
                    this.dialog.open(SharedDialogBoxComponent, {
                      data: {
                        value: `Session Timed out. Login Again`
                      }
                    });
                    this.logoutSvc.logout();
                  }
                  else {
                    this.dialog.open(SharedDialogBoxComponent, {
                      data: {
                        value: `Failed to load data. Retry`
                      }
                    });
                  }
                });
  }
  genHeaders(): HttpHeaders {
    
    let token : string = "";
    if(localStorage.getItem('access_token'))
    {
      token = localStorage.getItem('access_token');
    }
    else
    {
      this.router.navigate(['home']);
    }
    return new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  userName: string = "";
  ngOnInit() {
   
    this.ref.detectChanges();
    if (localStorage.getItem('userName')) {
      this.userName = localStorage.getItem('userName');
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
    
  }

}
