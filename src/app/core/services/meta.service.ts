import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Site } from '@core/models';
import { Seo } from '@core/models/seo.model';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  // seo: Seo = {
  //   metaTitle: 'Roble | Máquinas de gastronomía',
  //   metaDescription: '',
  // };

  constructor(
    @Inject(DOCUMENT) private dom: any,

    private titleService: Title,
    private metaService: Meta
  ) {}

  // createCanonicalURL() {
  //   let link: HTMLLinkElement = this.dom.createElement('link');
  //   link.setAttribute('rel', 'canonical');
  //   this.dom.head.appendChild(link);
  //   link.setAttribute('href', this.dom.URL);
  //   console.log('createCanonicalURL', link, this.dom.URL);
  // }

  setMeta(seo: Seo, site: Site) {
    this.titleService.setTitle(`${site.pageTitlePrefix} | ${seo.metaTitle}`);

    this.metaService.updateTag({
      name: 'description',
      content: seo.metaDescription,
    });

    // Establecer las etiquetas Open Graph
    this.metaService.updateTag({
      name: 'og:site_name',
      content: site.name,
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: `${site.pageTitlePrefix} | ${seo.metaTitle}`,
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: seo.metaDescription,
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: site.image,
    });
    let link: HTMLLinkElement = this.dom.createElement('link');
    this.metaService.updateTag({
      property: 'og:url',
      content: this.dom.URL,
    });

    // Establecer las tarjetas de Twitter
    // this.metaService.updateTag({ name: 'twitter:card', content: 'summary' });
    // this.metaService.updateTag({
    //   name: 'twitter:site',
    //   content: '@nombreusuario',
    // });
    // this.metaService.updateTag({
    //   name: 'twitter:title',
    //   content: 'Título para Twitter',
    // });
    // this.metaService.updateTag({
    //   name: 'twitter:description',
    //   content: 'Descripción para Twitter',
    // });
    // this.metaService.updateTag({
    //   name: 'twitter:image',
    //   content: 'URL de la imagen en miniatura para Twitter',
    // });

    // Establecer la URL canónica
    this.metaService.updateTag({
      rel: 'canonical',
      href: this.dom.URL,
    });
    console.log('canonical', this.dom.URL);
  }
}
