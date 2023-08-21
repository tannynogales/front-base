import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopUserHomeComponent } from './pages/shop-user-home/shop-user-home.component';

const routes: Routes = [
  {
    path: '',
    component: ShopUserHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopUserRoutingModule {}
