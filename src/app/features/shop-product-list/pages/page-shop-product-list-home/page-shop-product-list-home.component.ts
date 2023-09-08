import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Category, ItemObject } from '@core/models';
import { ProductsService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  providers: [ProductsService],
  selector: 'app-page-shop-product-list-home',
  templateUrl: './page-shop-product-list-home.component.html',
  styleUrls: ['./page-shop-product-list-home.component.scss'],
})
export class PageShopProductListHomeComponent implements OnInit, OnDestroy {
  Arr = Array;
  menu: Category[] = [
    {
      id: 1,
      name: 'Panadería y Pastelería',
      slug: 'panaderia-y-pasteleria',
    },
    {
      id: 2,
      name: 'Carnicería',
      slug: 'carniceria',
    },
    {
      id: 3,
      name: 'Panadería',
      slug: 'panaderia',
    },
    {
      id: 4,
      name: 'Refrigeración',
      slug: 'refrigeracion',
    },
    {
      id: 5,
      name: 'Restaurant',
      slug: 'acero-inoxidable',
    },
    {
      id: 6,
      name: 'Otros',
      slug: 'Otros',
    },
  ];
  // products = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  selectedMenuItem: string = '';

  products$: Observable<ItemObject>;
  constructor(
    private activatedRoute: ActivatedRoute,
    public productsService: ProductsService
  ) {
    this.products$ = this.productsService.products$;
  }

  ngOnDestroy(): void {
    // if (this.products$) {
    //   this.products$.);
    // }
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const categoryId = params.get('categoryId');
      if (categoryId !== null) {
        this.selectedMenuItem = categoryId;
        this.productsService.fetch(categoryId);
      }
    });
  }
}
