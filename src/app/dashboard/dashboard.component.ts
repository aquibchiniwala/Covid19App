import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { ILogin } from 'src/Models/ILogin';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:ILogin
  constructor(private service: DataService, private route: Router, private router: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.user;

  }

  logout() {
    this.user.role=0;
    sessionStorage.removeItem('loginData');
    localStorage.removeItem('loginData');
    this.route.navigate(['login']);
  }
}
