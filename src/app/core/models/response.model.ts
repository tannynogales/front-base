export interface Response {
  data: Array<{
    id: number;
    attributes: unknown;
  }>;
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

/*
Cambié el "data", estaba sde esta formatCurrency, pero no entiendo porqué tenía un array
data: Array<{
  id: number;
  attributes: unknown;
}>;
*/
