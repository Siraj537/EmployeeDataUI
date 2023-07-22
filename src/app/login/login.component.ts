import { Component } from '@angular/core';
import { LoginserviceService } from '../shared/loginservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginservice: LoginserviceService) { }
  hide = true;
  credentials = {
    username: "",
    password: ""
  }

  onSubmit() {
    if (this.credentials.username != '' && this.credentials.password != '' &&
      this.credentials.password != null && this.credentials.username != null) {
      console.log("calling server ");
      this.loginservice.generateToken(this.credentials).subscribe(
        (res) => {
          console.log(res);
           this.loginservice.loginUser(res.toString());
           window.location.href = "/dashboard";
        },
        error => {
          console.log(error);
        }
      )

    }
    else {
      console.log("Username or password fields are blank ");
    }
  }
}
