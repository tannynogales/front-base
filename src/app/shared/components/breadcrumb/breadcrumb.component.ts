import { Component, Input } from '@angular/core';

interface BreadcrumbItem {
  title: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
  @Input() backRoute!: string;
  historyPreviousRoute!: string;

  getRoute2Back(): string {
    if (this.backRoute) return this.backRoute;
    else return this.getHistoryPreviousRoute();
  }

  getHistoryPreviousRoute(): string {
    const history = localStorage.getItem('history');
    if (history) {
      let historyArray = JSON.parse(history);
      return historyArray[historyArray.length - 2];
    } else return '/home';
  }
}
