import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCustomersRoutingModule } from './admin-customers-routing.module';

import { SharedModule } from '@shared/shared.module';

// Pages
import { CustomersHomeComponent } from './pages/customers-home/customers-home.component';

@NgModule({
  // providers: [ProductsService],
  declarations: [CustomersHomeComponent],
  imports: [CommonModule, AdminCustomersRoutingModule, SharedModule],
})
export class AdminCustomersModule {}
