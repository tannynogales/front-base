import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss'],
})
export class ButtonIconComponent {
  @Input() icon: 'cart-shopping' | 'user' | 'bell' = 'bell';
  @Input() badge!: number;
  style = 'fa-solid fa-';
}
