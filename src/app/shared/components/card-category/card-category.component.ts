import { Component, Input } from '@angular/core';
import { Category } from '@core/models';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss'],
})
export class CardCategoryComponent {
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
