import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagecourseComponent } from './coursemgmt/managecourse/managecourse.component';

const routes: Routes = [
  {path : '', component: HomeComponent , pathMatch: 'full'},
  {path : 'login', component: LoginComponent , pathMatch: 'full'},
  // {path : 'dashboard', component: StudentComponent , pathMatch: 'full', canActivate: [AuthGuard]},
  {path : 'dashboard', component: DashboardComponent , pathMatch: 'full', canActivate: [AuthGuard],data:{expectedRole : ['admin','user']}},
  {path : 'signup', component: SignupComponent , pathMatch: 'full'},
  {path : 'managecourse', component: ManagecourseComponent , pathMatch: 'full'},
  {path : 'student', loadChildren : () => import('./student/student.module').then(m => m.StudentModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
