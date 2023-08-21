import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'Home',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    title: 'Home',
    loadChildren: () =>
      import('@features/shop/shop.module').then((m) => m.ShopModule),
  },
  {
    path: 'user',
    title: 'User Profile',
    loadChildren: () =>
      import('@features/shop-user/shop-user.module').then(
        (m) => m.ShopUserModule
      ),
  },
  {
    path: 'cart-shopping',
    title: 'Shopping Cart',
    loadChildren: () =>
      import('@features/shop-cart/shop-cart.module').then(
        (m) => m.ShopCartModule
      ),
  },

  {
    path: ':productId',
    loadChildren: () =>
      import('@features/shop-parent-category/shop-parent-category.module').then(
        (m) => m.ShopParentCategoryModule
      ),
  },

  // {
  //   path: 'home/:categoryId/:productId',
  //   title: 'Product Detail',
  //   loadChildren: () =>
  //     import('@features/shop/shop.module').then((m) => m.ShopModule),
  // },
  {
    path: '**', //TODO 404 cuando no existe la ruta
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopLayoutRoutingModule {}
