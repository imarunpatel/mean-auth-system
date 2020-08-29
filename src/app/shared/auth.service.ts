import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const endpoint = environment.endpoint;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient,
              private router: Router) { }

  signUp(user: User) {
    let api = `${endpoint}/register-user`;
    return this.http.post(api, user).pipe(
      catchError(this.handleError)
    )
  }

  signIn(user: User) {
    return this.http.post<any>(`${endpoint}/signin`, user).subscribe(
      (res:any) => {
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['user-profile/' + res.msg._id]);
        })
      }
    )
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  getUserProfile(id): Observable<any> {
    let api = `${endpoint}/user-profile/${id}`;
    return this.http.get(api, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
