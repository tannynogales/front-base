import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: '/home',
  // },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('@features/shop/shop.module').then((m) => m.ShopModule),
  },
  {
    path: '**', //TODO 404 cuando no existe la ruta
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopLayoutRoutingModule {}
