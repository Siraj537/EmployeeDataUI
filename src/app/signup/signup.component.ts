import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstant } from '../shared/services/common/GlobalConstant';
import { LoginserviceService } from '../shared/services/login/loginservice.service';
import { SnackbarService } from '../shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  password = true;
  naukriPassword = true;
  confirmPassword = true;
  signUpForm: any = FormGroup;
  responseMessage: any;

  constructor(private _route: Router, private formBuilder: FormBuilder,
    private snackBarService: SnackbarService, private dialogRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService, private service: LoginserviceService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name : ['', [Validators.required, Validators.pattern(GlobalConstant.nameRegex)]],
      email : [null, [Validators.required, Validators.pattern(GlobalConstant.emailRegex)]],
      mobile : ['', [Validators.required, Validators.pattern(GlobalConstant.contactRegex)]],
      city : ['', [Validators.required, Validators.pattern(GlobalConstant.nameRegex)]],
      batch : ['', Validators.required],
      password : ['', Validators.required],
      confirmPassword : ['', Validators.required],
      naukriEmail : ['', [Validators.required, Validators.pattern(GlobalConstant.emailRegex)]],
      naukriPassword : ['', Validators.required],
      role : ['', Validators.required],
      address : ['', Validators.required]
    });
  }

  validateSubmit() {
    if (this.signUpForm.controls['password'].value != this.signUpForm.controls['confirmPassword'].value) {
      return true;
    }
    return false;

  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.signUpForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      city: formData.city,
      contactNumber: formData.mobile,
      roles: formData.role,
      batch: formData.batch,
      address: formData.address,
      studentNaukriDetailsDTO: {
        naukriUserName: formData.naukriEmail,
        naukriPassword: formData.naukriPassword
      }
    }

    this.service.signUp(data).subscribe(
      (res: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.snackBarService.openSnackBar(res.message, "");
        this._route.navigate(["/"]);
      },
      (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        }
        else {
          this.responseMessage = GlobalConstant.genericError;
        }
        this.snackBarService.openSnackBar(this.responseMessage,GlobalConstant.error);
      })
  }
}
