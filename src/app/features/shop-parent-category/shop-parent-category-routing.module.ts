import { CarouselComponent } from './../../shared/components/carousel/carousel.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopCartHomeComponent } from '@features/shop-cart/pages/shop-cart-home/shop-cart-home.component';
import { ShopParentCategoryHomeComponent } from './pages/shop-parent-category-home/shop-parent-category-home.component';

const routes: Routes = [
  {
    path: '',
    component: ShopParentCategoryHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopParentCategoryRoutingModule {}
