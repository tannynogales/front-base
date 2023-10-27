import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NouisliderModule } from 'ng2-nouislider';

/* Components */
import * as sharedComponents from './components';

import * as sharedPipes from './pipes';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [...sharedComponents.components, ...sharedPipes.pipes],
  imports: [
    NgOptimizedImage,
    CommonModule,
    SharedRoutingModule,
    NouisliderModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
  ],
  exports: [
    ...sharedComponents.components,
    ...sharedPipes.pipes,
    NouisliderModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
