import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartsHomeComponent } from './pages/shopping-carts-home/shopping-carts-home.component';

const routes: Routes = [
  {
    path: '',
    title: 'Ordenes',
    component: ShoppingCartsHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminShoppingCartsRoutingModule {}
