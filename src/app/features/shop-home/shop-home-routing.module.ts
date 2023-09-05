import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageShopHomeComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: PageShopHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopHomeRoutingModule {}
