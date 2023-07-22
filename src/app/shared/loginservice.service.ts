import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private _http : HttpClient) { }

  url:string = "http://localhost:8085/students/";

  generateToken(credentials : any){
    return this._http.post(this.url+"authenticate",credentials,{ responseType: 'text' });
  }

  loginUser(token: string){
    localStorage.setItem("token" , token);
    return true;
  }

  isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token == '' || token == undefined || token == null){
      return false;
    }
    else {
      return true;
    }
  }

  logout(){
    localStorage.removeItem("token");
    return true;
  }

  getToken(){
    return localStorage.getItem("token");
  }
}
