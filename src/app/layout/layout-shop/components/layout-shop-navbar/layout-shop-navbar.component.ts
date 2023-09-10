import { Component, ElementRef, ViewChild } from '@angular/core';
import { CategoryObject, ParentCategoryObject } from '@core/models';
import {
  CategoriesService,
  ParentCategoriesService,
  SelectedParentCategoryService,
} from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-shop-navbar',
  templateUrl: './layout-shop-navbar.component.html',
  styleUrls: ['./layout-shop-navbar.component.scss'],
})
export class LayoutShopNavbarComponent {
  @ViewChild('offcanvasNavbar') offcanvasNavbar!: ElementRef;
  products: any[] = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  categories$: Observable<CategoryObject>;
  parentCategories$: Observable<ParentCategoryObject>;
  selectedParentCategory$: Observable<string>;

  constructor(
    private categoriesService: CategoriesService,
    private parentCategoriesService: ParentCategoriesService,
    private selectedParentCategoryService: SelectedParentCategoryService
  ) {
    this.categories$ = this.categoriesService.categories$;
    this.parentCategories$ = this.parentCategoriesService.parentCategories$;
    this.selectedParentCategory$ =
      this.selectedParentCategoryService.selectedParentCategory$;
  }

  closeOffcanvasNavbar() {
    const myOffcanvas = this.offcanvasNavbar.nativeElement;
    let openedCanvas = bootstrap.Offcanvas.getInstance(myOffcanvas);
    openedCanvas.hide();
  }

  changeParentCategory(event: any) {
    this.selectedParentCategoryService.setSelectedParentCategory(
      event.target.value
    );
    if (event.target.value == 'all') this.categoriesService.filterReset();
    else this.categoriesService.filterByParent(event.target.value);
  }
}
