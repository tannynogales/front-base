import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shop-product-detail-slider',
  templateUrl: './shop-product-detail-slider.component.html',
  styleUrls: ['./shop-product-detail-slider.component.scss'],
})
export class ShopProductDetailSliderComponent {
  @Input() slides: string[] = [];

  activeSlide: number = 0;

  setActiveSlide(activeSlide: number) {
    this.activeSlide = activeSlide;
  }
}
