import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NouisliderModule } from 'ng2-nouislider';

/* Components */
import * as sharedComponents from './components';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [...sharedComponents.components],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NouisliderModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    ...sharedComponents.components,
    NouisliderModule,
    FormsModule,
    HttpClientModule,
  ],
})
export class SharedModule {}
