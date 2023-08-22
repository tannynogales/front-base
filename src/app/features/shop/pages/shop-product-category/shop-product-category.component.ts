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

  ngOnDestroy(): void {
    this.closeOffcanvasNavbar();
  }

  closeOffcanvasNavbar() {
    const myOffcanvas = this.offcanvasFilters.nativeElement;
    let openedCanvas = bootstrap.Offcanvas.getInstance(myOffcanvas);
    openedCanvas.hide();
  }
}
