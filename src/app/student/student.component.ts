import { Component } from '@angular/core';
import { FormGroup , FormBuilder,Validators} from '@angular/forms';
import {student} from './student.model'
import {ApiService} from '../shared/api.service'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  showadd!: boolean;
  showupdate!: boolean;
  formvalue!: FormGroup
  studentData : student = new student;
  allStudentsData:any;

  constructor(private formBuilder:FormBuilder, private api:ApiService){

  }
  ngOnInit(): void{
    this.formvalue = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      mobile: ['',Validators.required],
      city: ['',Validators.required],
      batch:  ['',Validators.required]
    })

    this.getAllStudents();
  }

  add(){
    this.showadd = true;
    this.showupdate = false;
  }
  update(data:any){
    this.showadd = false;
    this.showupdate = true;
    this.studentData.studentId = data.studentId;
    this.formvalue.controls['name'].setValue(data.name);
    this.formvalue.controls['email'].setValue(data.email);
    this.formvalue.controls['city'].setValue(data.city);
    this.formvalue.controls['mobile'].setValue(data.mobile);
    this.formvalue.controls['batch'].setValue(data.batch);
  }

  addStudent(){
    this.studentData.name = this.formvalue.value.name;
    this.studentData.city = this.formvalue.value.city;
    this.studentData.email = this.formvalue.value.email;
    this.studentData.mobile = this.formvalue.value.mobile;
    this.studentData.batch = this.formvalue.value.batch;
   
    this.api.poststudent(this.studentData).subscribe(res => {
      this.formvalue.reset();
      alert("Record added successfully");
      this.getAllStudents();
    },
    err =>{
      console.log("something went wrong!!!")
    }
    );
  }

  getAllStudents(){
    this.api.getAllstudent().subscribe(res => {
     this.allStudentsData = res;
    },
    err =>{
      console.log("something went wrong!!!")
    }
    );
  }

  deleteStudent(data:any){
    if(confirm("Are you sure to delete ?")){
      this.api.deletestudent(data.studentId).subscribe(res => {
        alert("Record deleted successfully");
       },
       err =>{
         alert("something went wrong!!!");
       }
       );
    }
   
  }

  updateStudent(){
    this.studentData.name = this.formvalue.value.name;
    this.studentData.city = this.formvalue.value.city;
    this.studentData.email = this.formvalue.value.email;
    this.studentData.mobile = this.formvalue.value.mobile;
   this.studentData.batch = this.formvalue.value.batch;

    this.api.updatestudent(this.studentData.studentId,this.studentData).subscribe(res => {
      this.formvalue.reset();
      this.getAllStudents();
      alert("Record updated successfully");
    },
    err =>{
      alert("something went wrong!!!")
    }
    );
  }
}
