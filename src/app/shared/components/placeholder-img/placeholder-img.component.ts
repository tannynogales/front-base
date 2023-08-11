import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-placeholder-img',
  templateUrl: './placeholder-img.component.html',
  styleUrls: ['./placeholder-img.component.scss'],
})
export class PlaceholderImgComponent {
  @Input({ required: false }) name: string = 'Some Text';
}
