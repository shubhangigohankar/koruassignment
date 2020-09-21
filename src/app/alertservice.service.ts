import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Alertdata} from './alertdata';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertserviceService {
  baseurl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

// POST
CreateAlert(data): Observable<Alertdata> {
  return this.http.post<Alertdata>(this.baseurl + '/data/', JSON.stringify(data), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  );
}


// GET
GetAlerts(): Observable<Alertdata> {
  return this.http.get<Alertdata>(this.baseurl + '/data/')
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  );
}

// DELETE
DeleteAlert(id){
  return this.http.delete<Alertdata>(this.baseurl + '/data/' + id, this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}
// Error handling
errorHandl(error) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}
}
