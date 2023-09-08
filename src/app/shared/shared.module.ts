import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NouisliderModule } from 'ng2-nouislider';

/* Components */
import * as sharedComponents from './components';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardItemLoadingComponent } from './components/card-item-loading/card-item-loading.component';
import { CardItemComponent } from './components/card-item/card-item.component';

@NgModule({
  declarations: [
    ...sharedComponents.components,
    CardItemLoadingComponent,
    CardItemComponent,
  ],
  imports: [
    NgOptimizedImage,
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
