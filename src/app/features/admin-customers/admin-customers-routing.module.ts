import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersHomeComponent } from './pages/customers-home/customers-home.component';

const routes: Routes = [
  {
    path: '',
    title: 'customers',
    component: CustomersHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCustomersRoutingModule {}
