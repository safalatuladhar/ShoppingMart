import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { UserAuthService } from './services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-ecommerce';
  constructor(public readonly userAuthService: UserAuthService,
               public readonly loginService: LoginService,
                private readonly router: Router) {}
  logout(){
    this.userAuthService.clear();
    this.router.navigate(["/login"]);
  }
}
