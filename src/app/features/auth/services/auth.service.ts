import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { map, catchError, retry, tap } from 'rxjs/operators';
import { User } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.strapi;

  constructor(private http: HttpClient) { }

  public logIn(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.baseUrl}/api/auth/local`, {
        identifier: email,
        password: password,
      })
      .pipe(
        map((response: any): User => {
          return {
            name: response.user?.username,
            email: response.user?.email,
            jwt: response?.jwt,
            expires: response?.expires,
          };
        })
        // ,
        // tap( // Log the result or error
        //   {
        //     // next: (data) => console.log("bbb", data),
        //     error: (error) => {
        //       console.log("aa", error);
        //       return { data: 1 };
        //     }
        //   })
        // , catchError(this.handleError),
      );
  }

  public checkJWT(auth_token: string | undefined): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${auth_token}`,
      }),
    };

    return this.http.get<any>(`${this.baseUrl}/api/users/me`, httpOptions);
  }

  public create(
    email: string,
    password: string,
    passwordRepeat: string
  ): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/api/auth/local/register`, {
      username: email,
      email: email,
      password: password,
    });
  }
}
