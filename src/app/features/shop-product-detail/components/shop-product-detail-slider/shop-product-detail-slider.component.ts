import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-shop-product-detail-slider',
  templateUrl: './shop-product-detail-slider.component.html',
  styleUrls: ['./shop-product-detail-slider.component.scss'],
})
export class ShopProductDetailSliderComponent implements AfterViewInit {
  @ViewChild('carouselExampleDark') carousel!: ElementRef;

  @Input() slides: string[] = [];

  activeSlide: number = 0;

  setActiveSlide(activeSlide: number) {
    this.activeSlide = activeSlide;
  }

  ngAfterViewInit(): void {
    const myCarousel = this.carousel.nativeElement;

    // let carouselInstance = bootstrap.Carousel.getOrCreateInstance(myCarousel);
    const carousel = new bootstrap.Carousel(myCarousel, {
      ride: 'carousel',
      interval: 3000,
      touch: true,
    });

    // slid.bs.carousel: Fired when the carousel has completed its slide transition.
    myCarousel.addEventListener('slide.bs.carousel', (e: any) => {
      this.activeSlide = e.to;
    });
  }

  // TODO on destroy carrousel
}
