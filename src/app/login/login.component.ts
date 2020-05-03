import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ILogin } from '../../Models/ILogin';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: ILogin = {
    username: '',
    password: '',
    rememberMe: false,
    grant_type: 'password',
    role: 0
  };
  loggedIn: boolean;
  constructor(
    private service: DataService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.AuthenticateUser()) {
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit(x: any) {
    this.login(this.model);
  }

  login(loginData: ILogin) {

    if (loginData.username == 'admin' && loginData.password == 'admin') {
      if (loginData.rememberMe) {
        localStorage.setItem('loginData', JSON.stringify(loginData));
      } else {
        sessionStorage.setItem('loginData', JSON.stringify(loginData));
      }
      this.authService.user.role=1;
      this.router.navigate(['dashboard']);
    }
    else {
      window.alert("Invalid username or password.");
    }
  }
}
