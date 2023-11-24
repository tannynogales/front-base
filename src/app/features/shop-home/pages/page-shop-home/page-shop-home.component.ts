import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  BannerHomeService,
  CategoriesService,
  HighlightedHomeProductsService,
  MetaService,
  ParentCategoriesService,
  SelectedParentCategoryService,
  SiteService,
} from '@core/services';
import {
  BannerHomeObject,
  Category,
  CategoryObject,
  ItemsObject,
  ParentCategoryObject,
  Site,
  SiteObject,
} from '@core/models';
import { Observable } from 'rxjs';
import { Seo } from '@core/models/seo.model';

@Component({
  selector: 'app-page-shop-home',
  templateUrl: './page-shop-home.component.html',
  styleUrls: ['./page-shop-home.component.scss'],
})
export class PageShopHomeComponent implements OnInit, AfterViewInit {
  site!: Site;
  site$: Observable<SiteObject>;

  @ViewChild('miDiv', { static: true }) miDiv!: ElementRef;
  alturaDiv!: number;

  @HostListener('window:resize', ['$event'])
  onResize() {
    // console.log(event);
    // Actualizar la altura del div cuando cambie el tamaño del navegador
    this.alturaDiv = this.miDiv.nativeElement.offsetHeight;
    // console.log('Altura del div:', this.alturaDiv, 'px');
  }

  categories$: Observable<CategoryObject>;
  parentCategories$: Observable<ParentCategoryObject>;
  bannersHome$: Observable<BannerHomeObject>;
  highlightedHomeProducts$: Observable<ItemsObject>;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private categoriesService: CategoriesService,
    private parentCategoriesService: ParentCategoriesService,
    private selectedParentCategoryService: SelectedParentCategoryService,
    private bannerHomeService: BannerHomeService,
    private highlightedHomeProductsService: HighlightedHomeProductsService,
    private siteService: SiteService,
    private metaService: MetaService
  ) {
    this.siteService.fetch('roble');

    this.site$ = this.siteService.site$;

    this.categories$ = this.categoriesService.categories$;
    this.parentCategories$ = this.parentCategoriesService.parentCategories$;
    this.bannersHome$ = this.bannerHomeService.bannersHome$;
    this.highlightedHomeProducts$ =
      this.highlightedHomeProductsService.highlightedHomeProducts$;
  }

  ngAfterViewInit(): void {
    // this.cd.detectChanges();
    this.alturaDiv = this.miDiv.nativeElement.offsetHeight;
    // console.log('ngAfterViewInit', this.alturaDiv);
    this.changeDetectorRef.detectChanges();
  }

  // productList: any;
  ngOnInit(): void {
    this.categoriesService.filterReset();
    this.selectedParentCategoryService.setSelectedParentCategory('all');
    this.bannerHomeService.fetch();
    this.highlightedHomeProductsService.fetch();
    // this.parentCategoriesService.fetch();
    // this.productsService.fetch();
    // this.productsService.getTest$().subscribe((data) => {
    //   this.productList = data;
    //   console.log(data);
    // });
    // this.alturaDiv = this.miDiv.nativeElement.offsetHeight;
    // console.log('ngOnInit', this.alturaDiv);

    this.site$.subscribe((site) => {
      this.site = site.data;
      const seo: Seo = {
        metaTitle: site.data.seo.metaTitle,
        metaDescription: site.data.seo.metaDescription,
      };
      this.metaService.setMeta(seo, this.site);
    });
  }
  get hotProducts(): Category[] {
    let hotProducts: Category[] = [];
    hotProducts = this.categoriesService.highlightedCategories;
    return hotProducts;
  }
}
