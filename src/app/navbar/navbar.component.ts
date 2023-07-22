import { Component } from '@angular/core';
import { LoginserviceService } from '../shared/loginservice.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLogged: boolean = false;

  constructor(private logService : LoginserviceService, private _route : Router){}
  
  ngOnInit(): void {
    this.isLogged = this.logService.isLoggedIn();
  }

  logout(){
    this.logService.logout();
    location.reload();
  }

}
