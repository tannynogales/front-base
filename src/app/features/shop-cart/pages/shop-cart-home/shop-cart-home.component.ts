import { Component } from '@angular/core';

@Component({
  selector: 'app-shop-cart-home',
  templateUrl: './shop-cart-home.component.html',
  styleUrls: ['./shop-cart-home.component.scss'],
})
export class ShopCartHomeComponent {
  test() {
    navigator.share({
      url: 'https://google.com',
      title: 'Test title',
      text: 'Test text',
    });
  }
}
