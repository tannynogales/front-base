import { Component } from '@angular/core';
import { CategoriesService, ProductsService } from '@core/services';

@Component({
  selector: 'app-layout-shop',
  templateUrl: './layout-shop.component.html',
  styleUrls: ['./layout-shop.component.scss'],
})
export class LayoutShopComponent {
  constructor(private categoriesService: CategoriesService) {
    this.categoriesService.fetch();
  }
}
