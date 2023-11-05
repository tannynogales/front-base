import { Component, Input } from '@angular/core';
import { Site } from '@core/models';

@Component({
  selector: 'app-layout-shop-footer',
  templateUrl: './layout-shop-footer.component.html',
  styleUrls: ['./layout-shop-footer.component.scss'],
})
export class LayoutShopFooterComponent {
  @Input({ required: true }) site!: Site;
}
