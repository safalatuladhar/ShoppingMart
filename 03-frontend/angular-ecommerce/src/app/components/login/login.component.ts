import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interface/login.interface';
import { LoginService } from 'src/app/services/login.service';

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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      "userName": ['', Validators.required],
      "password": ['', Validators.required]
    });
  }

  loginUser() {
    this.loginService.loginUser(this.loginForm.value).subscribe({
      next: () => {
       alert("Login success"),
        this._route.navigate(['/product']).then();

      },
      
      error: () => alert("Login failed")
    });
     
  }
}
