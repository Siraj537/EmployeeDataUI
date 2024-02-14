import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstant } from '../shared/services/common/GlobalConstant';
import { LoginserviceService } from '../shared/services/login/loginservice.service';
import { SnackbarService } from '../shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  changeForm: any = FormGroup;
  responseMessage: any;
  oldpassword = true;
  newpassword = true;
  confirmpassword = true;

  constructor(private _route: Router, private formBuilder: FormBuilder,
    private snackBarService: SnackbarService, private dialogRef: MatDialogRef<ChangepasswordComponent>,
    private ngxService: NgxUiLoaderService, private service: LoginserviceService) { }


  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  validateSubmit() {
    if (this.changeForm.controls['newPassword'].value != this.changeForm.controls['confirmPassword'].value) {
      return true;
    }
    else {
      return false;
    }
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.changeForm.value;
    var data = {
      newPassword: formData.newPassword,
      oldPassword: formData.newPassword,
      confirmPassword: formData.newPassword,
    }
    this.service.changePassword(data).subscribe((res: any) => {
      this.ngxService.stop();
      this.dialogRef.close();
      this.snackBarService.openSnackBar(res.message, "success");
    },
      (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        }
        else {
          this.responseMessage = GlobalConstant.genericError;
        }
        this.snackBarService.openSnackBar(this.responseMessage, GlobalConstant.error);
      })
  }


}

