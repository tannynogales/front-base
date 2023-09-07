import { Component, ElementRef, ViewChild } from '@angular/core';
import { CategoryObject } from '@core/models';
import { CategoriesService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-shop-navbar',
  templateUrl: './layout-shop-navbar.component.html',
  styleUrls: ['./layout-shop-navbar.component.scss'],
})
export class LayoutShopNavbarComponent {
  @ViewChild('offcanvasNavbar') offcanvasNavbar!: ElementRef;
  products: any[] = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  category$: Observable<CategoryObject>;

  constructor(private categoriesService: CategoriesService) {
    this.category$ = this.categoriesService.categories$;
  }

  closeOffcanvasNavbar() {
    const myOffcanvas = this.offcanvasNavbar.nativeElement;
    let openedCanvas = bootstrap.Offcanvas.getInstance(myOffcanvas);
    openedCanvas.hide();
  }
}
