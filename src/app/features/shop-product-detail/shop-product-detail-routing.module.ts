import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageShopProductDetailHomeComponent } from './pages/page-shop-product-detail-home/page-shop-product-detail-home.component';

const routes: Routes = [
  {
    path: '',
    // title: 'Product Detail',
    component: PageShopProductDetailHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopProductDetailRoutingModule {}
