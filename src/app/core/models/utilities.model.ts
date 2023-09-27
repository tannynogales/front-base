export interface Region {
  id: string;
  name: string;
  code: string;
  comunas: Comuna[];
}

export interface Comuna {
  id: string;
  name: string;
  code: string;
  costo_despacho: number;
}

export interface RegionesObject {
  data: Region[];
  loading: boolean;
}
