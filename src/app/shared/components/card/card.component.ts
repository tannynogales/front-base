import { Component, Input } from '@angular/core';
import { Category } from '@core/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() loading: boolean = true;
  @Input() item: Category = {
    id: 1,
    name: '',
    slug: '',
    image: '',
    highlighted: true,
  };
  @Input() buttonLink?: string;
  @Input() buttonLabel?: string;
  @Input() button?: boolean = true;
}
