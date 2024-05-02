import { Component} from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  edit: FormGroup | any;
editData: any = [];
editdata:any = []
  login: any;
 
 
  constructor(private router:Router, private toastr:ToastrService) { 
    if (this.router.getCurrentNavigation()!.extras?.state != null) {
      this.editData = this.router.getCurrentNavigation()!.extras.state;
      console.log(this.edit);
    }
       this.edit = new FormGroup({
      'fullname': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required]),
      'phone': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'profile': new FormControl('', [Validators.required]),
      'address': new FormControl('', [Validators.required])
    })
    this.edit.patchValue(this.editData);
    
  }
  ngOnInit(): void {
 
  }
   updateData(editUser: any) {
      localStorage.setItem("login", JSON.stringify(editUser));
      localStorage.setItem("signup",JSON.stringify(editUser));
      this.toastr.success('Updated Successfully');
      this.router.navigateByUrl('home')
   }

  get fullname() {
    return this.edit.get('fullname')
  }
  get email() {
    return this.edit.get('email')
  }
  get phone() {
    return this.edit.get('phone')
  }
  get profile(){
    return this.edit.get('profile')
  }
  get address(){
    return this.edit.get('address')
  }

}