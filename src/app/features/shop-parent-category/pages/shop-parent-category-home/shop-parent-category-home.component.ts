import { Component } from '@angular/core';
import { Category } from '@layout/shop-layout/models';

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
}
