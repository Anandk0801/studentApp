// import { Token } from '@angular/compiler';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private toastr: ToastrService) { }
  login: FormGroup | any;
  // logindata:any;
  RigsterData: any = [];
  ngOnInit(): void {
    this.login = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })
  }

  logindata(data: any) {
    console.log('data', data)
    this.RigsterData = localStorage.getItem("signup");
    var Rdata = JSON.parse(this.RigsterData);
    const found = Rdata.find((element: any) => element.username == data.email && element.password == data.password);
    if (found != undefined) {
      localStorage.setItem("login", JSON.stringify(found));
      this.login.reset()
      this.toastr.success('Login Successfully');
      this.router.navigateByUrl('home')


    } else {
      console.log('User Not Found')
    }
  }

  get username() {
    return this.login.get('username')
  }
  get password() {
    return this.login.get('password')
  }
}



