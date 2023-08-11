import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ShopLayoutComponent } from './layout/shop-layout/layout/shop-layout/shop-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/layout/admin-layout/admin-layout.component';

const routes: Routes = [
  //   {
  //     path: '',
  //     pathMatch: 'full',
  //     redirectTo: '/dashboard',
  // },
  {
    path: 'test',
    component: ErrorComponent,
  },
  {
    path: '',
    component: ShopLayoutComponent,
    loadChildren: () =>
      import('./layout/shop-layout/shop-layout.module').then(
        (m) => m.ShopLayoutModule
      ),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () =>
      import('./layout/admin-layout/admin-layout.module').then(
        (m) => m.AdminLayoutModule
      ),
  },
  // TODO 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
