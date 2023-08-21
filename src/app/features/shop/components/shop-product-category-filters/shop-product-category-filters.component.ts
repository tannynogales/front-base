import { Component } from '@angular/core';
import { NouiFormatter } from 'ng2-nouislider';

@Component({
  selector: 'app-shop-product-category-filters',
  templateUrl: './shop-product-category-filters.component.html',
  styleUrls: ['./shop-product-category-filters.component.scss'],
})
export class ShopProductCategoryFiltersComponent {
  someRange = [100000, 300000];

  formatForSlider: NouiFormatter = {
    // 'from' the formatted value.
    // Receives a string, should return a number.
    from: function (formattedValue: string) {
      return Number(formattedValue);
    },

    // 'to' the formatted value. Receives a number.
    to: function (numericValue: number) {
      return Math.round(numericValue) + '';
    },
  };

  tooltips = {
    // tooltips are output only, so only a "to" is needed
    to: function (numericValue: number) {
      // return '$ ' + numericValue.toFixed(1)
      return '$ ' + new Intl.NumberFormat('es-CL').format(numericValue);
    },
  };
}
