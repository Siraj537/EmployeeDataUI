import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private _http: HttpClient) { }

  url: string = environment.studentApiUrl;

  generateToken(credentials: any) {
    return this._http.post(this.url + "authenticate", credentials, { responseType: 'text' });
  }

  loginUser(token: string) {
    localStorage.setItem("token", token);
    return true;
  }

  isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token == '' || token == undefined || token == null) {
      return false;
    }
    else {
      return true;
    }
  }

  logout() {
    localStorage.removeItem("token");
    return true;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  signUp(data: any) {
    return this._http.post(this.url + "students/credentials/signup", data, {
      headers: new HttpHeaders().set('content-type', 'application/json')
    });
  }



  forgotPassword(data: any) {
    return this._http.post(this.url + "students/credentials/forgotpassword", data, {
      headers: new HttpHeaders().set('content-type', 'application/json')
    });
  }

  
}
