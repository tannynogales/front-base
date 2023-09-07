import { Component, Input } from '@angular/core';
import { Category } from '@core/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() item!: Category;
  @Input() buttonLink!: string;
  @Input() buttonLabel!: string;
  @Input() button: boolean = true;
}
