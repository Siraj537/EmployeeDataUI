import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthGuard } from './shared/guards/auth.guard';
import { InterceptorService } from './shared/interceptor/interceptor.service';
import { SignupComponent } from './signup/signup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxUiLoaderConfig } from 'ngx-ui-loader';
import { NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { MatMenuModule } from '@angular/material/menu';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {MatSelectModule} from '@angular/material/select';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor : "#7b1fa2",
  fgsColor : "#7b1fa2",
  blur : 3,
  fgsType : SPINNER.squareJellyBox,
  fgsSize : 100,
  text : "Loading...",
  textColor : "#FFFFFF",
  textPosition : "center-center",
  hasProgressBar : true

}

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    ForgotPasswordComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [AuthGuard, [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }]],
  bootstrap: [AppComponent]
})
export class AppModule { }
