import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circular-stepper',
  templateUrl: './circular-stepper.component.html',
  styleUrls: ['./circular-stepper.component.scss'],
})
export class CircularStepperComponent {
  @Input() title: string = '';
  @Input() steps: number = 3;
  @Input() step: number = 1;

  strokeDasharray = 2 * Math.PI * 24; // 24 is the radius

  get strokeDashoffset() {
    return (
      this.strokeDasharray - (this.strokeDasharray / this.steps) * this.step
    );
  }

  constructor() {}
}
