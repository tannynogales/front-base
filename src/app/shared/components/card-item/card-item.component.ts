import { Component, Input } from '@angular/core';
import { Item } from '@core/models';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent {
  @Input() item!: Item;
  @Input() buttonLink!: string;
  @Input() buttonLabel!: string;
  @Input() button: boolean = true;
}
