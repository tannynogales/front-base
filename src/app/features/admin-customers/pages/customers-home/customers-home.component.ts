import { Component, OnInit } from '@angular/core';
import { CustomrsObject } from '@layout/layout-admin/models';
import { CustomersService } from '@layout/layout-admin/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customers-home',
  templateUrl: './customers-home.component.html',
  styleUrls: ['./customers-home.component.scss'],
})
export class CustomersHomeComponent implements OnInit {
  customers$: Observable<CustomrsObject>;
  constructor(private customersService: CustomersService) {
    this.customers$ = this.customersService.customers$;
  }

  ngOnInit(): void {
    this.customersService.fetch();
  }
}
