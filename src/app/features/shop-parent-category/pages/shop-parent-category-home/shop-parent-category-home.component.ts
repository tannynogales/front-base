import { SelectedParentCategoryService } from './../../../../core/services/selected-parent-category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  Category,
  CategoryObject,
  ItemsObject,
  ParentCategoryObject,
} from '@core/models';
import {
  CategoriesService,
  ParentCategoriesService,
  ParentCategoryProductsService,
} from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop-parent-category-home',
  templateUrl: './shop-parent-category-home.component.html',
  styleUrls: ['./shop-parent-category-home.component.scss'],
})
export class ShopParentCategoryHomeComponent implements OnInit {
  emptyProducts = new Array(12).fill(null);

  selectedMenuItem: string = '';
  categories$: Observable<CategoryObject>;
  parentCategories$: Observable<ParentCategoryObject>;
  selectedParentCategory$: Observable<string>;
  parentCategoryProducts$: Observable<ItemsObject>;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private parentCategoriesService: ParentCategoriesService,
    private selectedParentCategoryService: SelectedParentCategoryService,
    private parentCategoryProductsService: ParentCategoryProductsService
  ) {
    this.categories$ = this.categoriesService.categories$;
    this.parentCategories$ = this.parentCategoriesService.parentCategories$;
    this.selectedParentCategory$ =
      this.selectedParentCategoryService.selectedParentCategory$;
    this.parentCategoryProducts$ =
      this.parentCategoryProductsService.parentCategoryProducts$;
  }

  ngOnInit(): void {
    // this.parentCategoriesService.fetch();

    this.route.paramMap.subscribe((params: ParamMap) => {
      const parentCategoryID = params.get('parentCategoryID');
      if (parentCategoryID !== null) {
        this.selectedMenuItem = parentCategoryID;

        this.parentCategoryProductsService.fetch(parentCategoryID, 1);
        this.categoriesService.filterByParent(parentCategoryID);
        this.selectedParentCategoryService.setSelectedParentCategory(
          parentCategoryID
        );
      }
    });
  }

  changePage(page: number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.parentCategoryProductsService.fetch(this.selectedMenuItem, page);
  }
}
