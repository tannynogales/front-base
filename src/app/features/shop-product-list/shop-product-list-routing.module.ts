import {
  ElementRef,
  NgModule,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { PageShopProductListHomeComponent } from './pages/page-shop-product-list-home/page-shop-product-list-home.component';

const routes: Routes = [
  {
    path: '',
    title: 'Product List',
    component: PageShopProductListHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopProductListRoutingModule implements OnInit, OnDestroy {
  @ViewChild('offcanvasFilters') offcanvasFilters!: ElementRef;

  products = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // console.log(this.activatedRoute.snapshot.paramMap);
  }

  /**
  Previene el problema que se da cuando tienes el offcanvas abierto y se retocede
  con el navegador. En ese caso el offcanvas se cierra "a la fuerza", sin dar clic
  en la "X" y quedan estilos en el body del sitio que impiden hacer scroll
  */
  ngOnDestroy(): void {
    this.closeOffcanvasNavbar();
  }

  closeOffcanvasNavbar() {
    const myOffcanvas = this.offcanvasFilters?.nativeElement;
    let openedCanvas = bootstrap.Offcanvas.getInstance(myOffcanvas);
    if (openedCanvas) openedCanvas.hide();
  }
}
