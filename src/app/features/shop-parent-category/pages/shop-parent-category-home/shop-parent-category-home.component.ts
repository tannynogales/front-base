import { SelectedParentCategoryService } from './../../../../core/services/selected-parent-category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Category, CategoryObject, ParentCategoryObject } from '@core/models';
import { CategoriesService, ParentCategoriesService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop-parent-category-home',
  templateUrl: './shop-parent-category-home.component.html',
  styleUrls: ['./shop-parent-category-home.component.scss'],
})
export class ShopParentCategoryHomeComponent implements OnInit {
  products = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  selectedMenuItem: string = '';
  categories$: Observable<CategoryObject>;
  parentCategories$: Observable<ParentCategoryObject>;
  selectedParentCategory$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private parentCategoriesService: ParentCategoriesService,
    private selectedParentCategoryService: SelectedParentCategoryService
  ) {
    this.categories$ = this.categoriesService.categories$;
    this.parentCategories$ = this.parentCategoriesService.parentCategories$;
    this.selectedParentCategory$ =
      this.selectedParentCategoryService.selectedParentCategory$;
  }

  ngOnInit(): void {
    // this.parentCategoriesService.fetch();

    this.route.paramMap.subscribe((params: ParamMap) => {
      const parentCategoryID = params.get('parentCategoryID');
      if (parentCategoryID !== null) {
        this.selectedMenuItem = parentCategoryID;
        // console.log(parentCategoryID);
        this.categoriesService.filterByParent(parentCategoryID);
        this.selectedParentCategoryService.setSelectedParentCategory(
          parentCategoryID
        );
      }
    });
  }
}
