import { Injectable } from '@angular/core';
import { ILogin } from 'src/Models/ILogin';
import { INews } from 'src/Models/INews';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {

  newsUrl = 'api/news';
  stateUrl = 'https://api.covid19india.org/data.json';
  districtUrl = 'https://api.covid19india.org/state_district_wise.json';
  
  constructor(private http: HttpClient) { }

  PostNews(newNews: INews): Observable<INews> {
    return this.http.post<INews>(this.newsUrl, newNews, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetNews(): Observable<INews[]> {
    return this.http.get<INews[]>(this.newsUrl).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  DeleteNews(id: number): Observable<INews> {
    return this.http.delete<INews>(`${this.newsUrl}/${id}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetStateWiseCases() {
    return this.http.get(this.stateUrl).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  GetDistrictWiseCases() {
    return this.http.get(this.districtUrl).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
