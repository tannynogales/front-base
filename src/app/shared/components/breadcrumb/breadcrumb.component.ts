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

  obtenerPaginaAnterior() {
    let prevUrl = document.referrer;
    console.log('prevUrl', prevUrl);
    if (prevUrl.indexOf(window.location.host) !== -1) {
      // Ir a la página anterior
      window.history.back();
    }
  }
}
