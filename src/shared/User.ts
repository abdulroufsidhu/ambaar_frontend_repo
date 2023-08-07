import { Business } from "./Business";
export interface Person {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  contact?: string;
  nationalId?: string;
}
export interface User {
  id?: string;
  person: Person;
  password: string;
  role:
    | "admin"
    | "chief"
    | "owner"
    | "founder"
    | "manager"
    | "employee"
    | "partner";
  subrole?: string;
  business?: Business;
}
