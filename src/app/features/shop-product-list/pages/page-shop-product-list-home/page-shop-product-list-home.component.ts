import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Category, CategoryObject, ItemsObject } from '@core/models';
import { CategoriesService, ProductsService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  providers: [ProductsService],
  selector: 'app-page-shop-product-list-home',
  templateUrl: './page-shop-product-list-home.component.html',
  styleUrls: ['./page-shop-product-list-home.component.scss'],
})
export class PageShopProductListHomeComponent implements OnInit, OnDestroy {
  @ViewChild('offcanvasFilters') offcanvasFilters!: ElementRef;

  Arr = Array;
  menu: Category[] = [
    {
      id: 1,
      name: 'Panadería y Pastelería',
      slug: 'panaderia-y-pasteleria',
    },
    {
      id: 2,
      name: 'Carnicería',
      slug: 'carniceria',
    },
    {
      id: 3,
      name: 'Panadería',
      slug: 'panaderia',
    },
    {
      id: 4,
      name: 'Refrigeración',
      slug: 'refrigeracion',
    },
    {
      id: 5,
      name: 'Restaurant',
      slug: 'acero-inoxidable',
    },
    {
      id: 6,
      name: 'Otros',
      slug: 'Otros',
    },
  ];
  // products = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  categoryId: string = '';

  categories$: Observable<CategoryObject>;
  products$: Observable<ItemsObject>;
  constructor(
    private activatedRoute: ActivatedRoute,
    public productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {
    this.products$ = this.productsService.products$;
    this.categories$ = this.categoriesService.categories$;
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
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const categoryId = params.get('categoryId');
      if (categoryId !== null) {
        this.categoryId = categoryId;
        this.productsService.fetch(categoryId);
      }
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
