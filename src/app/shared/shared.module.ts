import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';

/* Components */
import * as sharedComponents from './components';

@NgModule({
  declarations: [...sharedComponents.components],
  imports: [CommonModule, SharedRoutingModule],
  exports: [...sharedComponents.components],
})
export class SharedModule {}
