import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentCrudService {

  url:string = environment.studentApiUrl;

  constructor(private _http:HttpClient) { }

  poststudent(data:any){
    
    return this._http.post<any>(this.url+"save",data).pipe(map((res:any) => {return res;}))
  }

  getstudent(data:any){
    return this._http.get<any>(this.url+"student/get/"+data.id+"/").pipe(map((res:any) => {return res;}))
  }

  getAllstudent(){
    return this._http.get<any>(this.url+"all").pipe(map((res:any) => {return res;}))
  }

  updatestudent(id:number,data:any){
    return this._http.put<any>(this.url+"student/update/",data).pipe(map((res:any) => {return res;}))
  }

  deletestudent(id:number){
    return this._http.delete<any>(this.url+"student/delete/"+id+"/").pipe(map((res:any) => {return res;}))
  }
}
