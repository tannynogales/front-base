import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ConfirmDialog } from './confirmDialog.model';
import { ConfirmDialogService } from './confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  data: ConfirmDialog = {};

  @ViewChild('confirmDialog', { static: true })
  public modalElement!: ElementRef<HTMLElement>;
  modalObject: any = null;

  confirmDialogService = inject(ConfirmDialogService);

  ngOnInit(): void {
    const _this = this;
    /**
     *   This function waits for a message from alert service, it gets
     *   triggered when we call this from any other component
     */
    this.confirmDialogService.message.subscribe((response) => {
      if (response?.closeModal === true) {
        this.modalObject.hide();
      } else {
        this.data.message = response.message;
        this.data.accept = {
          function: response.yesFn,
        };
        this.data.cancel = {
          function: response.noFn,
        };
        this.openConfirmDialog();
      }
    });
  }

  ngAfterViewInit() {
    let _this = this;

    this.modalObject = new bootstrap.Modal(this.modalElement.nativeElement, {
      keyboard: false,
    });

    /*
    This event is fired when the modal has finished being hidden
    from the user (will wait for CSS transitions to complete).
    */
    this.modalElement.nativeElement.addEventListener(
      'hidden.bs.modal',
      function (event: any) {}
    );
  }
  openConfirmDialog() {
    this.modalObject.show();
  }
}
