export interface CartDeliveryObject {
  deliveryOption: string;
  regionId: string;
  comunaId: string;
  streetName: string;
  streetNumber: string;
  // postalCode: string;
  department: string;
  packagingCost: number | false;
  shippingCost: number | false;
}
