import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout-shop-navbar',
  templateUrl: './layout-shop-navbar.component.html',
  styleUrls: ['./layout-shop-navbar.component.scss'],
})
export class LayoutShopNavbarComponent {
  @ViewChild('offcanvasNavbar') offcanvasNavbar!: ElementRef;
  products: any[] = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  closeOffcanvasNavbar() {
    const myOffcanvas = this.offcanvasNavbar.nativeElement;
    let openedCanvas = bootstrap.Offcanvas.getInstance(myOffcanvas);
    openedCanvas.hide();
  }
}
