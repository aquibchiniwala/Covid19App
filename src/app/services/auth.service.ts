import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/Models/ILogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user:ILogin={
      rememberMe: false,
        username: '',
        password: '',
        grant_type: '',
        role: 0
  };
  constructor(private router:Router) { 
  }

  AuthenticateUser():boolean{
    this.user  = JSON.parse(sessionStorage.getItem('loginData') ? sessionStorage.getItem('loginData') : localStorage.getItem('loginData')) as ILogin;
    if (this.user && this.user!=null && this.user.username=='admin' && this.user.password=='admin'){
      this.user.role=1;
      console.log("true");
      return true;
    }
    else {
      this.user= JSON.parse(`
        {
          "rememberMe": "false",
          "username": "",
          "password": "",
          "grant_type": "",
          "role": "0"
        }
      `) as ILogin ;
      this.user.role=0;
      console.log("false");
      // this.Logout();
      return false;
    }
  }
}
