import { Component, OnInit } from '@angular/core';
import { Site, SiteObject } from '@core/models';
import {
  CategoriesService,
  ParentCategoriesService,
  SiteService,
} from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-shop',
  templateUrl: './layout-shop.component.html',
  styleUrls: ['./layout-shop.component.scss'],
})
export class LayoutShopComponent implements OnInit {
  site!: Site;
  site$: Observable<SiteObject>;

  constructor(
    private siteService: SiteService,
    private categoriesService: CategoriesService,
    private parentCategoriesService: ParentCategoriesService
  ) {
    this.site$ = this.siteService.site$;

    this.categoriesService.fetch();
    this.parentCategoriesService.fetch();
    this.siteService.fetch('roble');
  }

  ngOnInit(): void {
    this.site$.subscribe((site) => {
      this.site = site.data;
    });
  }
}
