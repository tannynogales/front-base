import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConfirmDialog } from './confirmDialog.model';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private subject = new Subject<any>();

  get message(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor() {}

  // private openModal(data: ConfirmDialog): void {
  //   this.subject.next(data);
  // }

  confirmThis(message: string, yesFn: () => void, noFn?: () => void): any {
    const that = this;
    this.subject.next({
      message: message,
      yesFn(): any {
        that.subject.next({ closeModal: true }); // This will close the modal
        yesFn();
      },
      noFn(): any {
        that.subject.next({ closeModal: true }); // This will close the modal
        if (noFn) noFn();
      },
    });
  }
}
