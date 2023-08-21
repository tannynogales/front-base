import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopCartHomeComponent } from './pages/shop-cart-home/shop-cart-home.component';

const routes: Routes = [
  {
    path: '',
    component: ShopCartHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopCartRoutingModule {}
