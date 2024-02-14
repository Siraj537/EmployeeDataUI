import { Component } from '@angular/core';
import { LoginserviceService } from '../shared/services/login/loginservice.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean = false;

  constructor(private logService: LoginserviceService, private _route: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLogged = this.logService.isLoggedIn();
    this.isLogged = true;
  }

  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Logout',
      confirmation: true
    };
    dialogConfig.width = "40%";
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      dialogRef.close();
      this.logService.logout();
      location.reload();
    });
  }

  signupAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "100%";
    this.dialog.open(SignupComponent, { width: '600px' });
    //   height: '400px',
    //   width: '500px',
    //   panelClass: 'custom-dialog-container'
    // });
  }

  forgotPasswordAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "100%";
    this.dialog.open(ForgotPasswordComponent, { width: '600px' });
  }

  openMyMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }

  changePasswordAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "100%";
    this.dialog.open(ChangepasswordComponent, { width: '600px' });
  }
}
