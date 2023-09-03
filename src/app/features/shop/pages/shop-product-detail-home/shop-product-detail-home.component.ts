import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-product-detail-home',
  templateUrl: './shop-product-detail-home.component.html',
  styleUrls: ['./shop-product-detail-home.component.scss'],
})
export class ShopProductDetailHomeComponent {
  public href: string = '';
  isShareEnable = false;

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

  constructor(private router: Router) {}
  ngOnInit() {
    this.href = this.router.url;
    this.isShareEnable = 'share' in navigator;
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
}
