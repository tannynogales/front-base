export interface CartBillingObject {
  billing_type: 30 | 35; // 30: Factura, 35: Boleta
  billing_email?: string;
  billing_telefono?: string;
  billing_rut: string;
  billing_name: string;
  billing_giro: string;
  billing_direccion: string;
  billing_region?: string;
  billing_comuna: string;
}
