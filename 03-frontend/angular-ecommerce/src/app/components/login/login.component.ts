import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interface/login.interface';
import { LoginService } from 'src/app/services/login.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // user: Login = {} as Login;

  loginForm: FormGroup;

  constructor(
    private readonly loginService: LoginService,
    private _route: Router,
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      "userName": ['', Validators.required],
      "password": ['', Validators.required]
    });
  }

  loginUser() {
    this.loginService.loginUser(this.loginForm.value).subscribe({
      next: (response) => {
        this.userAuthService.setRoles(response.roles[0].role);
        this.userAuthService.setUserName(response.firstName);
        this.userAuthService.setUserId(response.id);

        const role = response.roles[0].role;
        console.log(role);
        if (role === 'admin') {
          this._route.navigate(['/admin/dashboard']);
        } else if (role === 'user') {
          this._route.navigate(['/user/dashboard']);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
      },
    });
     
  }
}
