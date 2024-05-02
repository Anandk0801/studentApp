
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  constructor(private router: Router, private toastr: ToastrService) { }
  signup: FormGroup | any;
  signupData: any = [];
  RigsterData: any = []
  ngOnInit(): void {
    this.signup = new FormGroup({
      'fullname': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required]),
      'phone': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'profile': new FormControl('', [Validators.required]),
      'address': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(5)])
      })
  }
  signupdata(_signup: FormGroup) {
    this.RigsterData = _signup
    var data: any = []

    data = localStorage.getItem("signup");
    this.signupData = JSON.parse(data);
    if (this.signupData != null) {
      this.signupData.forEach((element: any) => {
        console.log(element)
        if (element.email == this.RigsterData.email) {
          this.toastr.error('Email is Already Register');
        } else {
          console.log('IF', this.signupData);
          alert('Signup is  Successfully');
          this.signupData.push(_signup);
          localStorage.setItem("signup", JSON.stringify(this.signupData));
          this.signup.reset()
          this.router.navigateByUrl('login')
        }
      });
    } else {
      console.log('else')
      data = [];
      data.push(_signup)
      localStorage.setItem("signup", JSON.stringify(data));
    }

  }
  get fullname() {
    return this.signup.get('fullname')
  }

  get email() {
    return this.signup.get('email')
  }

  get phone() {
    return this.signup.get('phone')
  }
  get profile() {
    return this.signup.get('profile')
  }
  get address() {
    return this.signup.get('address')
  }

  get password() {
    return this.signup.get('password')
  }
}





