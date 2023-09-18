import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  CategoryObject,
  ParentCategoryObject,
  ShoppingCartObject,
} from '@core/models';
import {
  CategoriesService,
  ParentCategoriesService,
  SelectedParentCategoryService,
  ShoppingCartService,
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
  shoppingCart$: Observable<ShoppingCartObject>;

  constructor(
    private categoriesService: CategoriesService,
    private parentCategoriesService: ParentCategoriesService,
    private selectedParentCategoryService: SelectedParentCategoryService,
    private shoppingCartService: ShoppingCartService
  ) {
    this.categories$ = this.categoriesService.categories$;
    this.parentCategories$ = this.parentCategoriesService.parentCategories$;
    this.selectedParentCategory$ =
      this.selectedParentCategoryService.selectedParentCategory$;
    this.shoppingCart$ = this.shoppingCartService.shoppingCart$;
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

  increaseQuantity($event: boolean, productID: number) {
    this.shoppingCartService.addProduct({
      id: productID,
      url: '',
      name: '',
      price: 0,
      primary_image: '',
      quantity: 1,
    });
  }

  decreaseQuantity($event: boolean, productID: number, quantity: number) {
    const quantityDecreased = quantity - 1;
    if (quantityDecreased <= 0) {
      const confirm = window.confirm('¿Seguro que desea eliminar el producto?');
      if (confirm) this.shoppingCartService.removeProduct(productID);
    } else {
      console.log(quantityDecreased, quantity);
      this.shoppingCartService.addProduct(
        {
          id: productID,
          url: '',
          name: '',
          price: 0,
          primary_image: '',
          quantity: 1,
        },
        -1
      );
    }
  }
}
