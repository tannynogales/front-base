import {
  ElementRef,
  NgModule,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { PageShopProductListHomeComponent } from './pages/page-shop-product-list-home/page-shop-product-list-home.component';

const routes: Routes = [
  {
    path: '',
    title: 'Product List',
    component: PageShopProductListHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopProductListRoutingModule {}
