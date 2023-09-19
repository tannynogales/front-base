import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blob',
  templateUrl: './blob.component.html',
  styleUrls: ['./blob.component.scss'],
})
export class BlobComponent {
  // @Input() fill = '#D5E6DF';
  @Input() fill = '#ccc';
}
