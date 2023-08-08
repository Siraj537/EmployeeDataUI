import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstant } from '../shared/services/common/GlobalConstant';
import { LoginserviceService } from '../shared/services/login/loginservice.service';
import { SnackbarService } from '../shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  constructor(private _route: Router, private formBuilder: FormBuilder,
    private snackBarService: SnackbarService, private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private ngxService: NgxUiLoaderService, private service: LoginserviceService) { }

    forgotForm: any = FormGroup;
    responseMessage: any;

    ngOnInit(): void {
      this.forgotForm = this.formBuilder.group({
        email : [null, [Validators.required, Validators.pattern(GlobalConstant.emailRegex)]],
        role : ['', Validators.required]
      });
    }


    handleSubmit(){
      this.ngxService.start();
      var formData = this.forgotForm.value;
    var data = {
      email : formData.email
    }
    this.service.forgotPassword(data).subscribe((res : any) => {
      this.ngxService.stop();
      this.dialogRef.close();
      this.snackBarService.openSnackBar(res.message, "");
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
