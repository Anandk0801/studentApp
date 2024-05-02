import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { StudentsComponent } from './students/students.component';
import { EventsComponent } from './events/events.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
 
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'user-details',component:UserDetailsComponent},
  {path:'students',component:StudentsComponent},
  {path:'events',component:EventsComponent},
  {path:'schedule',component:ScheduleComponent},
  {path:'**',component:PageNotFoundComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
