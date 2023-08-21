import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NouisliderModule } from 'ng2-nouislider';

/* Components */
import * as sharedComponents from './components';

@NgModule({
  declarations: [...sharedComponents.components],
  imports: [CommonModule, SharedRoutingModule, NouisliderModule],
  exports: [...sharedComponents.components, NouisliderModule],
})
export class SharedModule {}
