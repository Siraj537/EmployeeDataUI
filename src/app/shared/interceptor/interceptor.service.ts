import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { LoginserviceService } from '../services/login/loginservice.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private loginservice: LoginserviceService, private _router: Router) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //any alteration in httpRequest can be done here
    let newReq = httpRequest;
    let token = this.loginservice.getToken();
    console.log("Interceptor", token);
    if (token != null) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      newReq = newReq.clone({ headers });
    }
    return next.handle(newReq).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err.url);
          if (err.status === 401 || err.status == 403) {
            if (this._router.url === "/") { }
            else {
              localStorage.clear();
              this._router.navigate(["/login"]);
            }
          }
        }
        throw new Error(err);
      })
    );

  }
}


