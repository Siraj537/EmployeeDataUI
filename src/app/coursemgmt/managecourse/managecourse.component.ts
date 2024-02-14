import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstant } from 'src/app/shared/services/common/GlobalConstant';
import { CoursesService } from 'src/app/shared/services/course/courses.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-managecourse',
  templateUrl: './managecourse.component.html',
  styleUrls: ['./managecourse.component.css']
})
export class ManagecourseComponent implements OnInit{

  displayedColumns : string[] = ['name','edit'];
  data : any;
  responseMessage : any;

constructor(private courseService : CoursesService, private _route : Router,
  private snackBarService : SnackbarService,private dislog :MatDialog,
  private ngxService : NgxUiLoaderService){}

  ngOnInit(): void {
   this.ngxService.start();
   this.tableData();
  }

  tableData() {
   this.courseService.getCourses().subscribe((res :any) => {
      this.ngxService.stop();
      this.data = res;
    },
    (err : any) => {
      this.ngxService.stop();
      console.log(err);
      if(err.error?.message){
        this.responseMessage = err.error?.message;
      }
      else {
        this.responseMessage = GlobalConstant.genericError;
      }
      this.snackBarService.openSnackBar(this.responseMessage,GlobalConstant.error);
    })
  }

  applyFilter(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filterValue = filterValue.trim().toLowerCase();
  }

  handleAction(){
    
  }


}
