import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDialogBoxComponent } from './shared-dialog-box.component';

describe('SharedDialogBoxComponent', () => {
  let component: SharedDialogBoxComponent;
  let fixture: ComponentFixture<SharedDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
