import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-see-more',
  templateUrl: './card-see-more.component.html',
  styleUrls: ['./card-see-more.component.scss'],
})
export class CardSeeMoreComponent {
  @Input() url!: string;
}
