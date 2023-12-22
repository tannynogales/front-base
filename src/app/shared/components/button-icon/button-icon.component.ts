import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss'],
})
export class ButtonIconComponent {
  @Input() icon:
    | 'cart-shopping'
    | 'search'
    | 'delete'
    | 'right-arrow'
    | 'placeholder' = 'search';
  @Input() badge: number = 0;
  size = '40';
  strokeWidth = 0.8399999999999999;
}
