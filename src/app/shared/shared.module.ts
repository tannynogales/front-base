import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NouisliderModule } from 'ng2-nouislider';

/* Components */
import * as sharedComponents from './components';
import { CircularStepperComponent } from './components/circular-stepper/circular-stepper.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [...sharedComponents.components, CircularStepperComponent],
  imports: [CommonModule, SharedRoutingModule, NouisliderModule, FormsModule],
  exports: [...sharedComponents.components, NouisliderModule, FormsModule],
})
export class SharedModule {}
