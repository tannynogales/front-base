import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent {
  @Input() loading?: boolean;
  @Input() title?: string;
  @Input() description?: string;
  @Input() price?: number;
  @Input() image?: string;
  @Input() callToActionLabel?: string;
  @Input() callToActionUrl?: string;
}
