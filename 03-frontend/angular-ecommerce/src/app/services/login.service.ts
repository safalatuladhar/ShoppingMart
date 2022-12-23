import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../interface/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  public loginUser(login: Login): Observable <any>{
    return this.httpClient.post<any>('http://localhost:8080/user/login',
      login
    );
  }
}
