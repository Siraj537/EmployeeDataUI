import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Course } from '../shared/services/common/Course';
import { GlobalConstant } from '../shared/services/common/GlobalConstant';
import { CoursesService } from '../shared/services/course/courses.service';
import { SnackbarService } from '../shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  responseMessage: any;
  data : any;

  constructor(private ngxService: NgxUiLoaderService, private snackBarService: SnackbarService,
    private courseService : CoursesService) {
    this.ngxService.start();
    this.getDashboadrData();
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getDashboadrData() {
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

}
