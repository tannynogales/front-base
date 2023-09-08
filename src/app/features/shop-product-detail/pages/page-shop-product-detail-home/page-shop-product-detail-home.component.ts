import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ItemObject } from '@core/models';
import { ProductService } from '@core/services';
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
  product$: Observable<ItemObject>;

  breadcrumbItems = [
    {
      title: 'Revolvedora',
      url: '/home/revolvedora-de-masas',
    },
    {
      title: 'Resolvedora de 15 kilos',
      url: '/home/revolvedora-de-masas/resolvedora-15-kilos',
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public productService: ProductService
  ) {
    this.product$ = this.productService.products$;
  }

  ngOnInit() {
    this.href = this.router.url; // e.g., /home/p/product-slug

    this.isShareEnable = 'share' in navigator;

    // TODO unsuscribe
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const productId = params.get('productId');
      if (productId !== null) {
        this.productId = productId;
        this.productService.fetch(productId);
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
