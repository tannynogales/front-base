import { Component, Input } from '@angular/core';
import { BannerHome } from '@core/models';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() loading: boolean = false;

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
}
