import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { provideToastr } from 'ngx-toastr';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EventsComponent } from './events/events.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ScheduleComponent } from './schedule/schedule.component';
import dayGridPlugin from '@fullcalendar/daygrid'; // dayGrid plugin




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    UserDetailsComponent,
    EventsComponent,
    ScheduleComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    RouterOutlet,
    FullCalendarModule,
    
    ToastrModule.forRoot()
  ],
  providers: [
    provideToastr(),
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
