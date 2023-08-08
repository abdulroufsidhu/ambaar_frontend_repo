import { Business } from "./business";

export interface Branch {
  _id?: string;
  name?: string;
  contact?: string;
  email?: string;
  location?: string;
  business?: Business;
}
