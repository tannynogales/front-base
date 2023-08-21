import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopPageHomeComponent } from './pages/shop-page-home/shop-page-home.component';
import { ShopProductCategoryComponent } from './pages/shop-product-category/shop-product-category.component';
import { ShopProductDetailHomeComponent } from './pages/shop-product-detail-home/shop-product-detail-home.component';

const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: ShopPageHomeComponent,
  },
  {
    path: ':productId',
    // title: 'Categoría',
    component: ShopProductCategoryComponent,
  },
  {
    path: ':categoryId/:productId',
    title: 'Product Detail',
    component: ShopProductDetailHomeComponent,
  },
  // {
  //   path: '**', //TODO 404 cuando no existe la ruta
  //   redirectTo: '/404',
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
