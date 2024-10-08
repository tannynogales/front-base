import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ItemObject, ItemsObject, Item } from '@core/models';
import {
  ProductService,
  ProductsService,
  CartProductsService,
  MetaService,
} from '@core/services';
import { Observable } from 'rxjs';
import { ToastService } from '@shared/components/toast/toast.service';
import { Seo } from '@core/models/seo.model';
@Component({
  selector: 'app-page-shop-product-detail-home',
  templateUrl: './page-shop-product-detail-home.component.html',
  styleUrls: ['./page-shop-product-detail-home.component.scss'],
})
export class PageShopProductDetailHomeComponent {
  public href: string = '';
  isShareEnable = false;
  productId!: number;
  categoryId: string = '';
  product$: Observable<ItemObject>;
  products$: Observable<ItemsObject>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private productsService: ProductsService,
    private cartProductsService: CartProductsService,
    private toastService: ToastService,
    private metaService: MetaService
  ) {
    this.product$ = this.productService.products$;
    this.products$ = this.productsService.products$;

    this.product$.subscribe((product) => {
      if (product.loading === false) {
        // TODO: debería tener un metaDescription máselaborado, que cumpla criterios de SEO como longitud y contenido de palabras clave.
        const seo: Seo = {
          metaTitle: product.data.name,
          metaDescription: product.data.description || '',
        };
        // TODO no debería tener valores en duro
        this.metaService.setMeta(seo, {
          cellphone: 0,
          cellphoneFormatted: 'string',
          name: 'Roble',
          pageTitlePrefix: 'Roble',
          image: product.data.primary_image,
          seo: {
            metaTitle: '',
            metaDescription: '',
          },
        });
      }
      //  else console.error('not found metaTitle or metaDescription');
    });
  }

  ngOnInit() {
    this.href = this.router.url; // e.g., /home/p/product-slug

    this.isShareEnable = 'share' in navigator;

    // TODO unsuscribe
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const categoryId = params.get('categoryId');
      const productId = params.get('productId');
      if (productId !== null && categoryId !== null) {
        this.productId = parseInt(productId);
        this.categoryId = categoryId;
        this.productService.fetch(productId);
        this.productsService.order = 'asc';
        this.productsService.fetch(categoryId); // TODO dont use categoryId and get the category from the product it self, in order to use selectedMenuItem instead product.category[0] in app-shop-parent-category-home
      }
    });
  }

  share(title: string | undefined) {
    navigator
      .share({
        text: title,
        url: this.href,
      })
      // .then(() => {})
      .catch((error) => console.error('Error al compartir:', error));
  }

  // Une en un sólo arreglo imagePrimary y imagesSecundary[]
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

  addProduct(product: ItemObject) {
    // if (product.data)
    this.cartProductsService.addProduct({
      productId: this.productId,
      url: `/home/${this.categoryId}/${this.productId}`,
      name: product.data.name,
      price: product.data.price,
      primary_image: product.data.primary_image,
      quantity: 1,
    });
    // alert('Producto añadido al carro');
    this.toastService.addToast({
      // title: 'Éxito !',
      message: 'Producto añadido al carro',
      // state: 'primary',
    });
  }

  filterProducts(products: Item[]): Item[] {
    return products.filter((item) => item.id != this.productId);
  }
}
