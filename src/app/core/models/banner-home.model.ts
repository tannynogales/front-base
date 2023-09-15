export interface BannerHome {
  slug: string;
  id: number;
  title: string;
  description?: string;
  image: string;
  callToActionLabel: string;
  callToActionUrl: string;
  price: number;
}

export interface BannerHomeObject {
  data: BannerHome[];
  loading: boolean;
}
