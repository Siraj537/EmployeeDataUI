import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalConstant } from '../services/common/GlobalConstant';
import { LoginserviceService } from '../services/login/loginservice.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginservice: LoginserviceService, private router: Router ,
    private snackBarService : SnackbarService) { }
  canActivate(  route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray['expectedRole'];
    let role = localStorage.getItem("role");
    let expectedRole : any = "";
    for(let i =0;i<expectedRoleArray['length'];i++){
      if(expectedRoleArray[i] == role){
          expectedRole = role;
      }
    }
    
    if (this.loginservice.isLoggedIn() && role == expectedRole) {
      return true;
    }
    this.snackBarService.openSnackBar("You are not authroized to access this page",GlobalConstant.error);
    //this.router.navigate(['login']);
    return true;
  }

}
