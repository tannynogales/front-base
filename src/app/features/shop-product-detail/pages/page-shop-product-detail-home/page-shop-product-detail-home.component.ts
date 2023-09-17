import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ItemObject, ItemsObject } from '@core/models';
import { ProductService, ProductsService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-shop-product-detail-home',
  templateUrl: './page-shop-product-detail-home.component.html',
  styleUrls: ['./page-shop-product-detail-home.component.scss'],
})
export class PageShopProductDetailHomeComponent {
  public href: string = '';
  isShareEnable = false;
  productId: string = '';
  categoryId: string = '';
  product$: Observable<ItemObject>;
  products$: Observable<ItemsObject>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private productsService: ProductsService
  ) {
    this.product$ = this.productService.products$;
    this.products$ = this.productsService.products$;
  }

  ngOnInit() {
    this.href = this.router.url; // e.g., /home/p/product-slug

    this.isShareEnable = 'share' in navigator;

    // TODO unsuscribe
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const categoryId = params.get('categoryId');
      const productId = params.get('productId');
      if (productId !== null && categoryId !== null) {
        this.productId = productId;
        this.categoryId = categoryId;
        this.productService.fetch(productId);
        this.productsService.fetch(categoryId); // TODO dont use categoryId and get the category from the product it self, in order to use selectedMenuItem instead product.category[0] in app-shop-parent-category-home
      }
    });
  }

  share() {
    navigator
      .share({
        title: 'Título del contenido compartido',
        text: 'Texto del contenido compartido',
        url: this.href,
      })
      // .then(() => {})
      .catch((error) => console.error('Error al compartir:', error));
  }

  getImages(
    imagePrimary: string | undefined,
    imagesSecundary: Array<string> | undefined
  ): string[] {
    let images: Array<string> = [];

    if (imagePrimary) {
      if (imagePrimary !== '') images.push(imagePrimary);
    }

    if (imagesSecundary) {
      if (imagesSecundary.length > 0) images = images.concat(imagesSecundary);
    }

    return images;
  }
}
