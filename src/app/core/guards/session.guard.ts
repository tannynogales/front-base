import { CanActivateFn } from '@angular/router';
import { UserService, PrivatePagesService } from '@core/services';
import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, catchError } from 'rxjs';
import { AuthService } from '@core/services';

// export const SessionGuard: CanActivateFn = (route, state) => {
//   inject(PrivatePagesService).privatePagesObservableData = state.url;
//   return inject(UserService)
//     .isLoggedIn()
//     .pipe(
//       map((isLoggedIn: boolean) => {
//         if (isLoggedIn) {
//           return true;
//         } else {
//           inject(Router).navigate(['/auth/login'], {
//             queryParams: { from: state.url },
//             // queryParamsHandling: 'preserve'
//           });
//           return true;
//         }
//       })
//     );
// };

// TODO use CanActivate has a function (class is deprecated)
@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    public authService: AuthService,
    private privatePagesService: PrivatePagesService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    this.privatePagesService.privatePagesObservableData = state.url;
    return this.userService.isLoggedIn().pipe(
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          return true;
        } else {
          this.router.navigate(['/auth/login'], {
            queryParams: { from: state.url },
          });
          return true;
        }
      })
    );
  }
}
