import { Component, Input } from '@angular/core';

interface Step {
  title: string;
  url: string;
}

@Component({
  selector: 'app-horizontal-stepper',
  templateUrl: './horizontal-stepper.component.html',
  styleUrls: ['./horizontal-stepper.component.scss'],
})
export class HorizontalStepperComponent {
  @Input() steps: Step[] = [
    {
      title: 'Despacho',
      url: 'delivery',
    },
    {
      title: 'Facturación',
      url: 'billing',
    },
    {
      title: 'Pago',
      url: 'payment',
    },
  ];

  @Input() activeStep = 2;

  getA(): number {
    let n = this.steps.length;
    let A = (n - 1) / (n + 1);
    // console.log('a', A);
    return A;
  }
  getB(): number {
    let n = this.steps.length;
    let y = 50;
    let B = this.getA() * n * y;
    // console.log('B', B);
    return B;
  }
  getC(): number {
    let n = this.steps.length;
    let y = 50;
    let C = (n - 2) * y;
    // console.log('C', C);
    return C;
  }
}
