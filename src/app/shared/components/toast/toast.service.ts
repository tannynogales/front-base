import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastDataModel } from './toastDataModel.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private subject = new Subject<any>();

  constructor() {}

  addToast(toastData: ToastDataModel) {
    this.subject.next({
      message: toastData.message,
      title: toastData?.title,
      state: toastData?.state,
    });
  }

  onToast(): Observable<any> {
    return this.subject.asObservable();
  }
}
