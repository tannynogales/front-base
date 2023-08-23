import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-product-category',
  templateUrl: './shop-product-category.component.html',
  styleUrls: ['./shop-product-category.component.scss'],
})
export class ShopProductCategoryComponent implements OnInit, OnDestroy {
  @ViewChild('offcanvasFilters') offcanvasFilters!: ElementRef;

  products = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap);
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
