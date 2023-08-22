import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-product-category',
  templateUrl: './shop-product-category.component.html',
  styleUrls: ['./shop-product-category.component.scss'],
})
export class ShopProductCategoryComponent implements OnInit, OnDestroy {
  products = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap);
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
}
