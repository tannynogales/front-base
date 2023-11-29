import { SelectedParentCategoryService } from './../../../../core/services/selected-parent-category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  Category,
  CategoryObject,
  ItemsObject,
  ParentCategoryObject,
} from '@core/models';
import { Seo } from '@core/models/seo.model';
import {
  CategoriesService,
  MetaService,
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
  parentCategories!: ParentCategoryObject;
  selectedParentCategory$: Observable<string>;
  parentCategoryProducts$: Observable<ItemsObject>;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private parentCategoriesService: ParentCategoriesService,
    private selectedParentCategoryService: SelectedParentCategoryService,
    private parentCategoryProductsService: ParentCategoryProductsService,
    private router: Router,
    private metaService: MetaService
  ) {
    this.categories$ = this.categoriesService.categories$;
    this.parentCategories$ = this.parentCategoriesService.parentCategories$;
    this.selectedParentCategory$ =
      this.selectedParentCategoryService.selectedParentCategory$;
    this.parentCategoryProducts$ =
      this.parentCategoryProductsService.parentCategoryProducts$;

    // this.parentCategoriesService.fetch();

    // TODO unsubscribe
    this.parentCategoriesService.parentCategories$.subscribe(
      (parentCategories) => {
        this.parentCategories = parentCategories;
      }
    );

    // TODO unsubscribe
    this.route.paramMap.subscribe((params: ParamMap) => {
      const parentCategoryID = params.get('parentCategoryID');
      if (parentCategoryID !== null) {
        this.selectedMenuItem = parentCategoryID;

        const parentCategory = this.parentCategories.data.find(
          (parentCategory) => parentCategory.slug === this.selectedMenuItem
        );
        console.log('parentCategory', parentCategory?.name);
        if (parentCategory?.name)
          this.setMeta({
            metaTitle: parentCategory?.name,
            metaDescription: parentCategory?.name,
          });

        this.parentCategoryProductsService.fetch(parentCategoryID, 1);
        this.categoriesService.filterByParent(parentCategoryID);
        this.selectedParentCategoryService.setSelectedParentCategory(
          parentCategoryID
        );
      }
    });
  }

  ngOnInit(): void {}

  changePage(page: number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.parentCategoryProductsService.fetch(this.selectedMenuItem, page);
  }

  goToProductList($event: any) {
    const categoryID = String($event.target.value);
    console.log('categoryID', categoryID);
    this.router.navigate(['/home/' + categoryID], {
      // queryParams: { from: state.url },
    });
  }

  setMeta(seo: Seo) {
    // TODO no debería tener valores en duro
    this.metaService.setMeta(seo, {
      cellphone: 0,
      cellphoneFormatted: 'string',
      name: 'Roble',
      pageTitlePrefix: 'Roble',
      image:
        'https://storage.googleapis.com/roble-strapi-bucket/site_og_image_ebbef09a93/site_og_image_ebbef09a93.jpg',
      seo: {
        metaTitle: '',
        metaDescription: '',
      },
    });
  }
}
