import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-vertical-counter',
  templateUrl: './vertical-counter.component.html',
  styleUrls: ['./vertical-counter.component.scss'],
})
export class VerticalCounterComponent {
  @Input() quantity = 0;
  @Output() increase$ = new EventEmitter<boolean>();
  @Output() decrease$ = new EventEmitter<boolean>();

  increase() {
    this.increase$.emit(true);
  }
  decrease() {
    this.decrease$.emit(true);
  }
}
