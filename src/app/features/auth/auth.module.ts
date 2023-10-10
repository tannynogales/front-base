import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

// Pages
import * as moduleContainers from './containers';

// import { NavigationModule } from '@navigation/navigation.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [...moduleContainers.containers],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    // NavigationModule,
  ],
})
export class AuthModule {}
