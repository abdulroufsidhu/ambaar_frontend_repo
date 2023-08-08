import { Person } from "./person";

export interface Business {
  _id?: string;
  name?: string;
  email?: string;
  contact?: string;
  licence?: string;
  founder?: Person;
}
