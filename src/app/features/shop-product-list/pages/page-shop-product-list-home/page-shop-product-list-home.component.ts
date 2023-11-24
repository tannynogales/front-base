import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  Category,
  CategoryObject,
  ItemsObject,
  ParentCategory,
} from '@core/models';
import { Seo } from '@core/models/seo.model';
import {
  CategoriesService,
  MetaService,
  ProductsService,
} from '@core/services';
import { Observable } from 'rxjs';

@Component({
  providers: [ProductsService],
  selector: 'app-page-shop-product-list-home',
  templateUrl: './page-shop-product-list-home.component.html',
  styleUrls: ['./page-shop-product-list-home.component.scss'],
})
export class PageShopProductListHomeComponent implements OnInit, OnDestroy {
  @ViewChild('offcanvasFilters') offcanvasFilters!: ElementRef;

  categoryId: string = '';
  maxPrice!: number;

  categories$: Observable<CategoryObject>;
  products$: Observable<ItemsObject>;
  constructor(
    private activatedRoute: ActivatedRoute,
    public productsService: ProductsService,
    private categoriesService: CategoriesService,
    private metaService: MetaService
  ) {
    console.log('product list constructor');

    this.products$ = this.productsService.products$;
    this.categories$ = this.categoriesService.categories$;

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const categoryId = params.get('categoryId');
      if (categoryId !== null) {
        this.categoryId = categoryId;
        this.productsService.fetch(categoryId);
      }
    });

    this.categories$.subscribe((categories) => {
      if (categories.data.length > 0 && categories.loading === false) {
        // console.log('categories', categories);
        if (this.categoryId !== '') {
          const category = categories.data.find(
            (category) => category.slug === this.categoryId
          );
          // console.log('category', category);
          const metaTitle = category?.seo?.metaTitle;
          const metaDescription = category?.seo?.metaDescription;
          if (metaTitle && metaDescription) {
            const seo: Seo = {
              metaTitle: metaTitle,
              metaDescription: metaDescription,
            };
            this.metaService.setMeta(seo, {
              cellphone: 0,
              cellphoneFormatted: 'string',
              name: 'Roble',
              pageTitlePrefix: 'Roble',
              image:
                'https://storage.googleapis.com/roble-strapi-bucket/site_og_image_ebbef09a93/site_og_image_ebbef09a93.jpg',
              seo: {
                metaTitle: '',
                metaDescription: '',
              },
            });
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    // if (this.products$) {
    //   this.products$.);
    // }

    /**
  Previene el problema que se da cuando tienes el offcanvas abierto y se retocede
  con el navegador. En ese caso el offcanvas se cierra "a la fuerza", sin dar clic
  en la "X" y quedan estilos en el body del sitio que impiden hacer scroll
  */
    this.closeOffcanvasNavbar();
  }

  ngOnInit(): void {
    console.log('product list OnInit');

    this.productsService.products$.subscribe((products) => {
      if (!this.maxPrice) this.maxPrice = products.data[0]?.price;
      // console.log('maxPrice', this.maxPrice);
    });
  }

  changePage(page: number) {
    this.scrollToTop();
    this.productsService.fetch(this.categoryId, page);
  }

  scrollToTop() {
    // Esto hace que el scroll suba suavemente al principio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getCategoryName(categories: Category[]) {
    return categories.find((category) => category.slug === this.categoryId)
      ?.name;
  }

  onOffcanvasFilterChange($event: any) {
    this.closeOffcanvasNavbar();
  }

  sortByOnChange(event: any) {
    this.productsService.order = event.target.value;
    this.productsService.fetch(this.categoryId, 1);
  }

  closeOffcanvasNavbar() {
    const myOffcanvas = this.offcanvasFilters?.nativeElement;
    let openedCanvas = bootstrap.Offcanvas.getInstance(myOffcanvas);
    if (openedCanvas) openedCanvas.hide();
  }
}
