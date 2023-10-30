import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from '@core/services';
import { NouiFormatter } from 'ng2-nouislider';

@Component({
  selector: 'app-shop-product-list-filters',
  templateUrl: './shop-product-list-filters.component.html',
  styleUrls: ['./shop-product-list-filters.component.scss'],
})
export class ShopProductListFiltersComponent implements OnInit {
  @Output() onChange = new EventEmitter<boolean>();
  @Input() categoryId!: string;
  @Input() min: number = 0;
  // TODO el máximo debería venir de la categoría, para que sea automático y no queden todos los productos con un máximo tan alto. También, debería haber un hook en productos de manera que cada vez que se actualice un item se gatille un servicio que revise todos los item de esa categoria y actualice automaticamente el máximo.
  @Input() max!: number;

  // Selected range
  someRange!: number[];

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

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    console.log('constructor max', this.max);
    if (this.max >= 0) {
      this.someRange = [0, this.max + 1000]; // sumo el "step"
    }
  }

  onSliderChange(event: any) {
    this.onChange.emit(true);
    console.log(event);
    this.productsService.filterByPrice = {
      min: this.someRange[0],
      max: this.someRange[1],
    };
    this.productsService.fetch(this.categoryId, 1);
  }
}
