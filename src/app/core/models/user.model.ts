export interface User {
  id: string;
  name: string;
  email: string;
  jwt: string;
  expires?: Date;
}
