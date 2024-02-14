import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../shared/services/login/loginservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  isLogged : boolean = false;
  constructor(private _router : Router, private logInService : LoginserviceService){}

  ngOnInit(): void {
    this.isLogged = this.logInService.isLoggedIn();
    if(this.isLogged){
      this._router.navigate(["/dashboard"]);
    }
  }

}
