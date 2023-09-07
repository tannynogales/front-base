import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Core Services */
import * as coreComponents from './services';

@NgModule({
  providers: [...coreComponents.services],
  declarations: [],
  imports: [CommonModule],
})
export class CoreModule {}
