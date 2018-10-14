import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { Venue } from "../../../../models/venue.model";
import { Form } from "@angular/forms";
import { EditVenueService } from "../../../../services/edit-venue.service";
import { HTTPRequestService } from "../../../../services/httprequest.service";
import { HttpHeaders } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { LogoutService } from "../../../../shared/logout.service";
import { MatDialog } from "@angular/material/dialog";
import { SharedDialogBoxComponent } from "../../../../shared/shared-dialog-box/shared-dialog-box.component";

@Component({
  selector: 'app-edit-venue',
  templateUrl: './edit-venue.component.html',
  styleUrls: ['./edit-venue.component.css']
})
export class EditVenueComponent implements OnInit {
  title = 'AddVenuePage';
  venue: Venue;
  AddVenueForm: FormGroup;
  roomTypes = ['Meeting Room', 'Board Room', 'Conference Room'];
  acTypes = ['Central', 'Split', 'Window', 'None'];
  formData: FormData;
  spin: boolean = false;
  venueID: string;
  validContactNumberStatus: boolean = false;
  contactNumber: string;
  doesVenueHasImages : boolean = false;

  constructor(private fb: FormBuilder,
    public _editVenueService: EditVenueService, private route: ActivatedRoute, private _http: HTTPRequestService, private router: Router, private logoutSvc: LogoutService, public dialog: MatDialog, private httpSvc: HTTPRequestService) {
    this.formData = new FormData();
  }

  GetVenueDetails() {
    let token: string = "";
    if (localStorage.getItem('access_token') && localStorage.getItem('role') && localStorage.getItem('role') === 'Admin') {
      token = localStorage.getItem('access_token');
    }
    let header: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.httpSvc.get(`/api/v1/Venue/${this.venueID}`, header).subscribe((data: Venue) => {

      if (data) {

        this.venue = data;

        if(this.venue && this.venue.VenueImages.length > 0)
          this.doesVenueHasImages = true;

        this.AddVenueForm.patchValue(this.venue);
        this.contactNumber = this.venue.ContactNumber;
      }
      else {
        this.dialog.open(SharedDialogBoxComponent, {
          data: {
            value: 'Invalid venue request'
          }
        });
      }
    }, error => {
      if (error.status === 401) {
        this.dialog.open(SharedDialogBoxComponent, {
          data: {
            value: `Session timed out. Please login again!!!`
          }
        });
        this.logoutSvc.logout();
      }
      else {
        this.dialog.open(SharedDialogBoxComponent, {
          data: {
            value: `${error.message}`
          }
        });

      }

    });
  }

  ngOnInit() {
    this.createForm();
    this.venueID = this.route.snapshot.paramMap.get('id');

    if (this.venueID) {
      this.GetVenueDetails();

    }
    else {
      this.router.navigate(['/manage/venue']);
    }

  }
  public createForm() {
    this.AddVenueForm = this.fb.group({
      VenueName: new FormControl('', [Validators.required]),
      VenueCity: new FormControl('', [Validators.required]),
      VenueState: new FormControl('', [Validators.required]),
      NumberOfProjectors: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]),
      SeatCapacity: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]),
      RoomType: new FormControl('', [Validators.required]),
      NumberOfMicroPhones: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]),
      NumberOfPhones : new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]),
      Description: new FormControl('', [Validators.required]),
      HourlyRate: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000000)]),
      AirConditioningType: new FormControl('', [Validators.required]),
      IsFoodVendingMachineAvailable: new FormControl(false),
      IsWaterVendingMachineAvailable: new FormControl(false),
      IsCoffeeVendingMachineAvailable: new FormControl(false),
      WirelessNetworkType: new FormControl('', [Validators.required])
    })

  }// Getters
  get VenueName(): FormControl {
    return this.AddVenueForm.get('VenueName') as FormControl;
  }
  get VenueCity(): FormControl {
    return this.AddVenueForm.get('VenueCity') as FormControl;
  }
  get VenueState(): FormControl {
    return this.AddVenueForm.get('VenueState') as FormControl;
  }
  get NumberOfProjectors(): FormControl {
    return this.AddVenueForm.get('NumberOfProjectors') as FormControl;
  }
  get Description(): FormControl {
    return this.AddVenueForm.get('Description') as FormControl;
  }
  get NumberOfPhones (): FormControl {
    return this.AddVenueForm.get('NumberOfPhones') as FormControl;
  }
  get SeatCapacity(): FormControl {
    return this.AddVenueForm.get('SeatCapacity') as FormControl;
  }
  get RoomType(): FormControl {
    return this.AddVenueForm.get('RoomType') as FormControl;
  }
  get NumberOfMicroPhones(): FormControl {
    return this.AddVenueForm.get('NumberOfMicroPhones') as FormControl;
  }
  get AirConditioningType(): FormControl {
    return this.AddVenueForm.get('AirConditioningType') as FormControl;
  }
  get IsFoodVendingMachineAvailable(): FormControl {
    return this.AddVenueForm.get('IsFoodVendingMachineAvailable') as FormControl;
  }
  get IsWaterVendingMachineAvailable(): FormControl {
    return this.AddVenueForm.get('IsWaterVendingMachineAvailable') as FormControl;
  }
  get IsCoffeeVendingMachineAvailable(): FormControl {
    return this.AddVenueForm.get('IsWaterVendingMachineAvailable') as FormControl;
  }
  get WirelessNetworkType(): FormControl {
    return this.AddVenueForm.get('IsWaterVendingMachineAvailable') as FormControl;
  }
  get HourlyRate(): FormControl {
    return this.AddVenueForm.get('HourlyRate') as FormControl;
  }


  generateHttpHeader(): HttpHeaders {
    let token: string = "";
    if (localStorage.getItem('access_token')) {
      token = localStorage.getItem('access_token');
    }
    return new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  generateHttpHeaderForFile(): HttpHeaders {
    let token: string = "";
    if (localStorage.getItem('access_token')) {
      token = localStorage.getItem('access_token');
    }
    return new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  OnFileUpload(Files: File[], event) {
    event.preventDefault();

    //Guard clause for checking empty files
    if (Files.length === 0)
      {
        this.dialog.open(SharedDialogBoxComponent, {
          data: {
            value: "Please upload at least a single image!!"
          }
        });
        return;
      }

    length = this.venue.VenueImages.length + Files.length;
    if (length > 5) {
      this.dialog.open(SharedDialogBoxComponent, {
        data: {
          value: "Images count should be less than 5!!"
        }
      });
      return;
    }
    for (let file of Files) {
      this.formData.append(file.name, file);
    }

    this.uploadPhotos();
  }
  spinOn() {
    this.spin = true;
  }
  spinOff() {
    this.spin = false;
  }
  uploadPhotos() {

    if(this.formData) {
      this.spinOn();
      this.httpSvc.putFile(`/api/v1/venue/venue-image/${this.venueID}`, this.formData, this.generateHttpHeaderForFile())
        .subscribe((data: any) => {
          this.spinOff();
         
          this.dialog.open(SharedDialogBoxComponent, {
            data: {
              value: `Images uploaded successfully`
            }
          });
          this.router.navigate(['/manage/venue']);
        }, error => {
          this.formData = new FormData();
          this.spinOff();
          if (error.status === 401) {
            this.dialog.open(SharedDialogBoxComponent, {
              data: {
                value: `Session Timed Out. Please login again!!`
              }
            });
            this.logoutSvc.logout();
          }
          else {
            console.log(error);
            this.dialog.open(SharedDialogBoxComponent, {
              data: {
                value: error
              }
            });
          }
        });
    }
  }
  OnSubmit() {

    let venueFormData: Venue = new Venue(this.AddVenueForm.value);
    venueFormData.VenueID = this.venue.VenueID;
    let venueData = JSON.stringify(venueFormData);
    this.formData.set('formValue', venueData);
    this.spinOn();
    this._http.put(`/api/v1/venue/${venueFormData.VenueID}`, venueData, this.generateHttpHeader())
      .subscribe(response => {
        this.spinOff();
        this.dialog.open(SharedDialogBoxComponent, {
          data: {
            value: `Edited the venue successfully`
          }
        });
        this.router.navigate(['/manage/venue']);
      }, error => {
        this.formData = new FormData();
        this.spinOff();
        if (error.status === 401) {
          this.dialog.open(SharedDialogBoxComponent, {
            data: {
              value: `Session Timed Out. Please login again!!`
            }
          });
          this.logoutSvc.logout();
        }
        else {
          this.dialog.open(SharedDialogBoxComponent, {
            data: {
              value: error.error.message
            }
          });
        }
      });
  }
  EditImage(event, venueImage) {

    let formdata = new FormData();
    this.spinOn();
    this.httpSvc.delete(`/api/v1/venue/venue-image/${venueImage.VenueImageID}`
      , this.generateHttpHeader()).subscribe(Response => {
        this.spinOff();
        this.GetVenueDetails();
        this.dialog.open(SharedDialogBoxComponent, {
          data: {
            value: "Image deleted sucessfully"
          }
        })
      },
      error => {

        this.spinOff();
        if (error.status === 401) {
          this.dialog.open(SharedDialogBoxComponent, {
            data: {
              value: `Session Timed Out. Please login again!!`
            }
          });
          this.logoutSvc.logout();
        }
        else {
          this.dialog.open(SharedDialogBoxComponent, {
            data: {
              value: "failed to delete the image please try again!!"
            }
          });
        }
      })
  }
}
