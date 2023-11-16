import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartsHomeComponent } from './pages/shopping-carts-home/shopping-carts-home.component';
import { ShoppingCartDetailComponent } from './pages/shopping-cart-detail/shopping-cart-detail.component';

const routes: Routes = [
  {
    path: '',
    title: 'Ordenes',
    component: ShoppingCartsHomeComponent,
  },
  {
    path: ':shoppingCartId',
    component: ShoppingCartDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminShoppingCartsRoutingModule {}
