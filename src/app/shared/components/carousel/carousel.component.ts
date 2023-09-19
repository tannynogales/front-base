import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { BannerHome } from '@core/models';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit {
  @Input() loading: boolean = false;
  @ViewChild('carouselHome') carousel!: ElementRef;

  @Input() items: BannerHome[] = [
    {
      slug: '',
      id: 1,
      title: 'some title',
      description: 'some log description',
      image: '',
      callToActionLabel: '',
      callToActionUrl: '',
      price: 99.99,
    },
  ];

  ngAfterViewInit(): void {
    const myCarousel = this.carousel.nativeElement;

    // let carouselInstance = bootstrap.Carousel.getOrCreateInstance(myCarousel);
    const carousel = new bootstrap.Carousel(myCarousel, {
      ride: 'carousel',
      interval: 3000,
      touch: true,
    });
  }

  // TODO on destroy carrousel
}
