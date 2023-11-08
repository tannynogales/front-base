import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'Clientes',
    pathMatch: 'full',
    redirectTo: '/admin/customers',
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('@features/admin-customers/admin-customers.module').then(
        (m) => m.AdminCustomersModule
      ),
  },
  {
    path: 'shopping-carts',
    loadChildren: () =>
      import('@features/admin-shopping-carts/admin-shopping-carts.module').then(
        (m) => m.AdminShoppingCartsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutAdminRoutingModule {}
