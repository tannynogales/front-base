import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { ToastService } from '@shared/components/toast/toast.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss'],
})
export class LogOutComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.userService.deleteUser();

    this.router.navigateByUrl('/').then(() => {
      this.toastService.addToast({ message: 'Sesión cerrada' });
    });
  }

  ngOnInit(): void {}
}
