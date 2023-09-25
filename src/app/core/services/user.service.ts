import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '@core/models';
import { environment } from 'src/environments/environment.development';
import { RememberMeService } from '@core/services/remember-me.service';
import { AuthService } from '@core/services/auth.service';
import { map, Observable, Subject, catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private cookieService: CookieService,
    public rememberMeService: RememberMeService,
    public authService: AuthService
  ) {}

  checkUser(): boolean {
    return (
      this.cookieService.check('userName') &&
      this.cookieService.check('userEmail') &&
      this.cookieService.check('userJWT')
    );
  }

  getUser(): User {
    // const user: boolean = this.checkUser();

    // if (user) {
    const _user = {
      name: this.cookieService.get('userName'),
      email: this.cookieService.get('userEmail'),
      jwt: this.cookieService.get('userJWT'),
      expires: this.cookieService.get('userExpires')
        ? new Date(this.cookieService.get('userExpires'))
        : undefined,
    };
    return _user;
    // } else
    //   return null;
  }

  deleteUser(): void {
    this.cookieService.delete('userName', '/');
    this.cookieService.delete('userEmail', '/');
    this.cookieService.delete('userJWT', '/');
    this.cookieService.delete('userExpires', '/');
  }

  setUser(user: User): void {
    const cookieOptions = {
      path: '/',
      expires: !this.rememberMeService.rememberMe
        ? this.addMinutes(new Date(), environment.sessionExpirationTime)
        : undefined,
    };

    this.cookieService.set('userName', user.name, cookieOptions);
    this.cookieService.set('userEmail', user.email, cookieOptions);
    this.cookieService.set('userJWT', user.jwt, cookieOptions);
    this.cookieService.set(
      'userExpires',
      cookieOptions.expires ? cookieOptions.expires.toString() : '',
      cookieOptions
    );
  }

  public isLoggedIn(): Observable<boolean> {
    const checkUser: boolean = this.checkUser();
    if (!checkUser) return of(false);

    const user: User = this.getUser();
    return this.authService.checkJWT(user?.jwt).pipe(
      map((response: any) => {
        if (response?.confirmed == true && response?.blocked == false) {
          this.setUser({
            name: user.name,
            email: user.email,
            jwt: user.jwt,
            expires: user.expires,
          });
          return true;
        } else {
          this.deleteUser();
          return false;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.deleteUser();
        return of(false);
      })
    );
  }

  public keepLoggedIn() {
    const user: User = this.getUser();
    this.setUser({
      name: user.name,
      email: user.email,
      jwt: user.jwt,
      expires: user.expires,
    });
  }

  private addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }
}
