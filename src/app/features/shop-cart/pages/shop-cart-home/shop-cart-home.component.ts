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
  deviceorientation = '';

  constructor() {
    // window.addEventListener('deviceorientation', (event) => {
    //   // Obtener los valores de inclinación (en grados) en los ejes X e Y
    //   const beta = event.beta; // Inclinación hacia adelante/atrás (eje X)
    //   const gamma = event.gamma; // Inclinación hacia los lados (eje Y)
    //   this.deviceorientation = `translate(${gamma}px, ${beta}px)`;
    //   // Ajusta la transformación CSS en función de los valores del giroscopio
    //   // background.style.transform = `translate(${gamma}px, ${beta}px)`;
    // });
  }
}
