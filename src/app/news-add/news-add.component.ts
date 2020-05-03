import { Component, OnInit } from '@angular/core';
import { INews } from 'src/Models/INews';
import { AngularFireStorage } from '@angular/fire/storage';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {
  model: INews = {
    id: null,
    title: '',
    description: '',
    summary: '',
    fullNews: ''
  };
  constructor(
    private service: DataService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.postNews(this.model);
  }

  postNews(newNews: INews) {
    this.service.PostNews(newNews).subscribe(response => {
      console.log(response);
      this.toastr.success('News Posted Sucessfully', 'Covid-19 Portal');
      this.router.navigateByUrl('dashboard/news');
    }, (error) => {
      this.toastr.error(error.error, 'Covid-19 Portal');
    });
  }
}
