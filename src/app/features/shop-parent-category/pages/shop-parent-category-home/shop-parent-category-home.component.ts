import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Category } from '@core/models';

@Component({
  selector: 'app-shop-parent-category-home',
  templateUrl: './shop-parent-category-home.component.html',
  styleUrls: ['./shop-parent-category-home.component.scss'],
})
export class ShopParentCategoryHomeComponent {
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
  products = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  selectedMenuItem: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const productId = params.get('productId');
      if (productId !== null) {
        this.selectedMenuItem = productId;
        // console.log(productId);
      }
    });
  }
}
