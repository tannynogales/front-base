import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  CategoryObject,
  ParentCategoryObject,
  ShoppingCartObject,
  Site,
} from '@core/models';
import {
  CategoriesService,
  ParentCategoriesService,
  SelectedParentCategoryService,
  CartProductsService,
  UserService,
} from '@core/services';
import { ConfirmDialogService } from '@shared/components/confirm-dialog/confirm-dialog.service';
import { ToastService } from '@shared/components/toast/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-shop-navbar',
  templateUrl: './layout-shop-navbar.component.html',
  styleUrls: ['./layout-shop-navbar.component.scss'],
})
export class LayoutShopNavbarComponent {
  @Input({ required: true }) site!: Site;
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
    private cartProductsService: CartProductsService,
    private toastService: ToastService,
    public userService: UserService,
    private confirmDialogService: ConfirmDialogService,
    public router: Router
  ) {
    this.categories$ = this.categoriesService.categories$;
    this.parentCategories$ = this.parentCategoriesService.parentCategories$;
    this.selectedParentCategory$ =
      this.selectedParentCategoryService.selectedParentCategory$;
    this.shoppingCart$ = this.cartProductsService.shoppingCart$;
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
    this.cartProductsService.increaseProductQuantity(productID);
  }

  decreaseQuantity($event: boolean, productID: number, quantity: number) {
    const quantityDecreased = quantity - 1;
    if (quantityDecreased <= 0) {
      this.confirmDialogService.confirmThis(
        '¿Desea quitar el producto de su carrito?',
        () => {
          this.cartProductsService.deleteProduct(productID);
          this.toastService.addToast({
            message: 'Producto eliminado del carro',
          });
        }
      );
    } else {
      // console.log(quantityDecreased, quantity);
      this.cartProductsService.decreaseProductQuantity(productID);
    }
  }

  logout() {
    this.confirmDialogService.confirmThis(
      '¿Seguro que desea cerrar sesión?',
      () => {
        this.userService.deleteUser();

        this.router.navigateByUrl('/').then(() => {
          this.toastService.addToast({ message: 'Has cerrado sesión' });
        });
      }
    );
  }
}
