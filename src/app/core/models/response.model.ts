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
