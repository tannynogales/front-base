import { Seo } from './seo.model';

export interface SiteObject {
  data: Site;
  loading: boolean;
}

export interface Site {
  cellphone: number;
  cellphoneFormatted: string;
  name: string;
  pageTitlePrefix: string;
  seo: Seo;
  image: string;
}
