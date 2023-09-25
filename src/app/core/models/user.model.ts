export interface User {
  name: string;
  email: string;
  jwt: string;
  expires?: Date;
}
