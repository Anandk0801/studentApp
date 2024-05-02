
import { Component} from '@angular/core';
import { NavigationExtras, Router, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  login:any;
  signup:any;
  constructor(private router:Router, private toastr:ToastrService ) {
    const Rdata=localStorage.getItem('login');
    if(Rdata != null) {
      this.login = JSON.parse(Rdata);
      console.log( this.login)
    }
  }
  onLogout() {
    this.toastr.success('Logout Successfully');
    localStorage.removeItem('login');
    this.router.navigateByUrl('/login')
  }
  onEdit() {
    const navigationExtras: NavigationExtras = {
      state: this.login
  };
  this.router.navigate(['/user-details'], navigationExtras); 
 
      
 
  
}
}

  


