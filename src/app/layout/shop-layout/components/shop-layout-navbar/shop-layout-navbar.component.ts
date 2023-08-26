import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shop-layout-navbar',
  templateUrl: './shop-layout-navbar.component.html',
  styleUrls: ['./shop-layout-navbar.component.scss'],
})
export class ShopLayoutNavbarComponent {
  @ViewChild('offcanvasNavbar') offcanvasNavbar!: ElementRef;
  products: any[] = [{}, {}, {}, {}, {}, {}];

  closeOffcanvasNavbar() {
    const myOffcanvas = this.offcanvasNavbar.nativeElement;
    let openedCanvas = bootstrap.Offcanvas.getInstance(myOffcanvas);
    openedCanvas.hide();
  }
}
