import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  url: string = environment.courseApiUrl;

  constructor(private _http: HttpClient) { }

  getCourses(){
    return of([
      {
        courseId : 1,
    courseName : "Mongo",
    tutor : "mongo",
    fee : 1000,
    duration : "2 Months"
      },
      {
        courseId : 1,
    courseName : "Mongo",
    tutor : "mongo",
    fee : 1000,
    duration : "2 Months"
      },
      {
        courseId : 1,
    courseName : "Mongo",
    tutor : "mongo",
    fee : 1000,
    duration : "2 Months"
      }
    ]
    )
    //this._http.get<any>(this.url).pipe(map((res:any) => {return res;}))
  }

  addCourse(data: any) {
    return this._http.post(this.url + "courses", data, {
      headers: new HttpHeaders().set('content-type', 'application/json')
    });
  }

  updateCourse(data: any) {
    return this._http.post(this.url + "courses", data, {
      headers: new HttpHeaders().set('content-type', 'application/json')
    });
  }
  
}
