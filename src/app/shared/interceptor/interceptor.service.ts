import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginserviceService } from '../services/login/loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private loginservice: LoginserviceService) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //any alteration in httpRequest can be done here
    let newReq = httpRequest;
    let token = this.loginservice.getToken();
    console.log("Interceptor", token);
    if (token != null) {

      const headers = new HttpHeaders({
        'Authorization': 'Bearer '+token
      });

      newReq = newReq.clone({headers});
      
    }
    return next.handle(newReq);

  }
}


