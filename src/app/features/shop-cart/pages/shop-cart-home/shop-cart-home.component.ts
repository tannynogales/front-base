import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-shop-cart-home',
  templateUrl: './shop-cart-home.component.html',
  styleUrls: ['./shop-cart-home.component.scss'],
})
export class ShopCartHomeComponent {
  despachoRadioItems = [
    {
      id: 1,
      title: 'Retiro en tienda',
      description:
        'Avenida Recoleta #2504, Comuna de Recoleta, Santiago, Chile',
    },
    {
      id: 2,
      title: 'Despacho por chilexpress',
      description: 'Los Mirlos #181, Viña del Mar, Chile',
    },
  ];
  selectedDespachoOption: number = 1;
}
