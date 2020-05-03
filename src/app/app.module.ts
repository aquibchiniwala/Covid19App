import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewsAddComponent } from './news-add/news-add.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsListComponent } from './news-list/news-list.component';
import { MustMatchDirective } from './_helpers/must-match.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { CasesGraphComponent } from './cases-graph/cases-graph.component';
import { ChartsModule } from 'ng2-charts';
import { AuthGuard } from './guards/auth.guard';
import { DataService } from './services/data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NewsInMemoryDbService } from './services/news-in-memory-db.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { StateListComponent } from './state-list/state-list.component';
import { DistrictListComponent } from './district-list/district-list.component';
import { PrecautionsComponent } from './precautions/precautions.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'addnews',
        component: NewsAddComponent,
        canActivate: [AuthGuard],
      },

      {
        path: '',
        component: CasesGraphComponent,
      },
      {
        path: 'news',
        component: NewsListComponent,
      },
      {
        path: 'statewise',
        component: StateListComponent
      },
      {
        path: 'districtwise',
        component: DistrictListComponent
      },
      {
        path: 'precautions',
        component: PrecautionsComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewsAddComponent,
    DashboardComponent,
    NewsListComponent,
    MustMatchDirective,
    CasesGraphComponent,
    NewsListComponent,
    StateListComponent,
    DistrictListComponent,
    PrecautionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ChartsModule,
    HttpClientInMemoryWebApiModule.forRoot(NewsInMemoryDbService, { passThruUnknownUrl: true }),
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added

  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule { }
