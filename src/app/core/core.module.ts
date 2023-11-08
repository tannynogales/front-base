import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Core Services */
import * as coreServices from './services';

@NgModule({
  providers: [...coreServices.services], // TODO sacar del core los servicios queson de features
  declarations: [],
  imports: [CommonModule],
})
export class CoreModule {}
