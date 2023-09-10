import { Component } from '@angular/core';
import { CategoriesService, ParentCategoriesService } from '@core/services';

@Component({
  selector: 'app-layout-shop',
  templateUrl: './layout-shop.component.html',
  styleUrls: ['./layout-shop.component.scss'],
})
export class LayoutShopComponent {
  constructor(
    private categoriesService: CategoriesService,
    private parentCategoriesService: ParentCategoriesService
  ) {
    this.categoriesService.fetch();
    this.parentCategoriesService.fetch();
  }
}
