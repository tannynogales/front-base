import { Component, Input, OnInit } from '@angular/core';

export type Icon =
  | 'arrow-right-to-arc'
  | 'arrow-right-from-bracket'
  | 'user-plus'
  | 'plus'
  | null;

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon: Icon = null;
  @Input() style: 'primary' | 'secondary' = 'primary';
  @Input() outline: boolean = false;
  // @Input() routerLink!: string;

  get class() {
    if (this.outline) return `btn btn-outline-${this.style}`;
    else return `btn btn-${this.style}`;
  }
  constructor() {}

  ngOnInit(): void {}

  buttonClick() {
    // console.log('buttonClick');
  }
}
