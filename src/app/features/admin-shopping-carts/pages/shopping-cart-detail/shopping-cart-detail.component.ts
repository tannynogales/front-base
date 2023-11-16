import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  ShoppingCartItemsObject,
  ShoppingCartProductsService,
} from '@layout/layout-admin/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart-detail',
  templateUrl: './shopping-cart-detail.component.html',
  styleUrls: ['./shopping-cart-detail.component.scss'],
})
export class ShoppingCartDetailComponent implements OnInit {
  shoppingCartProducts$: Observable<ShoppingCartItemsObject>;

  constructor(
    private route: ActivatedRoute,
    private shoppingCartProductsService: ShoppingCartProductsService
  ) {
    this.shoppingCartProducts$ =
      this.shoppingCartProductsService.shoppingCartProducts$;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const shoppingCartId = params.get('shoppingCartId');
      if (shoppingCartId !== null) {
        console.log(shoppingCartId);
        this.shoppingCartProductsService.fetch(shoppingCartId);
      }
    });
  }
}
