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
  ParentCategoriesService,
  SelectedParentCategoryService,
} from '@core/services';
import {
  BannerHomeObject,
  Category,
  CategoryObject,
  ItemsObject,
  ParentCategoryObject,
} from '@core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-shop-home',
  templateUrl: './page-shop-home.component.html',
  styleUrls: ['./page-shop-home.component.scss'],
})
export class PageShopHomeComponent implements OnInit, AfterViewInit {
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
    private highlightedHomeProductsService: HighlightedHomeProductsService
  ) {
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
  }
  get hotProducts(): Category[] {
    let hotProducts: Category[] = [];
    hotProducts = this.categoriesService.highlightedCategories;
    return hotProducts;
  }
}
