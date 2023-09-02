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
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    );

    navEndEvents$.subscribe((event: NavigationEnd) => {
      console.log(event);
      gtag('config', 'G-XVMF57F2DX', {
        page_path: event.urlAfterRedirects,
      });
    });
  }
}
