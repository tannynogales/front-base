import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutAdminRoutingModule } from './layout-admin-routing.module';
import { LayoutAdminComponent } from './layout/admin-layout/layout-admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import * as adminServices from './services';

@NgModule({
  providers: [...adminServices.services],
  declarations: [LayoutAdminComponent, SidebarComponent],
  imports: [CommonModule, LayoutAdminRoutingModule],
})
export class LayoutAdminModule {}
