import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopPageHomeComponent } from './pages/shop-page-home/shop-page-home.component';

const routes: Routes = [
  {
    path: '',
    component: ShopPageHomeComponent,

    // loadChildren: () =>
    //   import('@features/shop/tracks.module').then((m) => m.TracksModule),
  },
  // {
  //   path: '**', //TODO 404 cuando no existe la ruta
  //   redirectTo: '/404',
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
