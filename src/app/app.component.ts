import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { MetaService } from '@core/services';

declare var gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'neges';

  constructor(private router: Router, private metaService: MetaService) {
    const navEndEvents$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    );

    navEndEvents$.subscribe((event: NavigationEnd) => {
      const history = localStorage.getItem('history');
      if (!history) {
        const home = ['/home', event.urlAfterRedirects];
        const historyJSON = JSON.stringify(home);
        localStorage.setItem('history', historyJSON);
      } else {
        let historyArray = JSON.parse(history);

        if (historyArray[historyArray.length - 1] != event.urlAfterRedirects) {
          historyArray.push(event.urlAfterRedirects);
          localStorage.setItem('history', JSON.stringify(historyArray));
        }
      }
      gtag('config', 'G-CS4ZNPELWM', {
        page_path: event.urlAfterRedirects,
      });
    });
  }
  ngOnInit(): void {
    this.metaService.createCanonicalURL();
  }
}
