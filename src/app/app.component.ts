import { Router, NavigationEnd } from '@angular/router';
import { Component } from '@angular/core';
import { filter } from 'rxjs';

declare var gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'neges';

  constructor(private router: Router) {
    const navEndEvents$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );

    navEndEvents$.subscribe((event: any) => {
      console.log(event.urlAfterRedirects);
      gtag('config', 'G-XVMF57F2DX', {
        page_path: event.urlAfterRedirects,
      });
    });
  }
}
