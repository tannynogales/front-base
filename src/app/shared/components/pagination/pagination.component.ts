import { Pagination } from '@core/models';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  Arr = Array;

  @Input() pagination!: Pagination;
  @Output() clickOnPagination$ = new EventEmitter<number>();

  clickOnPagination(page: number) {
    this.clickOnPagination$.emit(page);
  }
}
