import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from './toast.service';
import { ToastDataModel } from './toastDataModel.model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, AfterContentInit {
  serviceSubscription!: Subscription;

  @Input() toasts: ToastDataModel[] = [];

  @ViewChildren('singleToast')
  private viewChildren!: QueryList<ElementRef<HTMLInputElement>>;

  toast: any | null = null;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private toastService: ToastService
  ) {
    this.serviceSubscription = this.toastService
      .onToast()
      .subscribe((responce: ToastDataModel) => {
        if (responce) {
          this.addToast(responce);
        } else {
          // clear messages when empty message received
          this.toasts = [];
        }
      });
  }

  ngAfterContentInit(): void {}

  ngOnInit(): void {}

  show() {
    this.toast!.show();
  }

  addToast(toastData: ToastDataModel) {
    this.toasts.push({ ...toastData, date: new Date() });

    this.changeDetectorRef.detectChanges();

    // this.viewChildren.forEach((child, index) => {

    //   console.log(child.nativeElement.innerHTML, index);

    //   this.toast = new Toast(child.nativeElement, {});
    //   this.toast!.show();

    // });

    let lastChild = this.viewChildren.last;

    this.toast = bootstrap.Toast.getOrCreateInstance(lastChild.nativeElement);
    // this.toast = new Toast(lastChild.nativeElement, {});

    this.toast!.show();
  }

  deleteToast(index: number, element: any) {
    // console.log(element);
    // this.toasts.splice(index - 1, 1);
    // this.changeDetectorRef.detectChanges();
    // Returns a Bootstrap toast instance
    // var myToast = bootstrap.Toast.getOrCreateInstance(element)
  }
}
