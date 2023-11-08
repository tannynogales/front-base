import { Component } from '@angular/core';
import { ShoppingCartsObject } from '@layout/layout-admin/models';
import { ShoppingCartsService } from '@layout/layout-admin/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-carts-home',
  templateUrl: './shopping-carts-home.component.html',
  styleUrls: ['./shopping-carts-home.component.scss'],
})
export class ShoppingCartsHomeComponent {
  shoppingCarts$: Observable<ShoppingCartsObject>;

  constructor(private shoppingCartsService: ShoppingCartsService) {
    this.shoppingCarts$ = this.shoppingCartsService.shoppingCarts$;
  }

  ngOnInit(): void {
    this.shoppingCartsService.fetch();
  }
}
