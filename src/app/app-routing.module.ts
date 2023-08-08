import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path : '', component: HomeComponent , pathMatch: 'full'},
  {path : 'login', component: LoginComponent , pathMatch: 'full'},
  {path : 'dashboard', component: StudentComponent , pathMatch: 'full', canActivate: [AuthGuard]},
  {path : 'signup', component: SignupComponent , pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
