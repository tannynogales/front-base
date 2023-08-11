import { Component, Input } from '@angular/core';

interface Item {
  title: string;
  image: string;
  description?: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() item!: Item;
  @Input() buttonLink!: string;
  @Input() buttonLabel!: string;
  @Input() button: boolean = true;
}
