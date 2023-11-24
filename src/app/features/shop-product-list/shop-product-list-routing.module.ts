import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageShopProductListHomeComponent } from './pages/page-shop-product-list-home/page-shop-product-list-home.component';

const routes: Routes = [
  {
    path: '',
    component: PageShopProductListHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopProductListRoutingModule {}
