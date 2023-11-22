import axios from "axios";
import { ServerUrls } from "../routes";
import { MyApiResponse } from "./unified-response";

export interface IPerson {
  _id?: string;
  name?: string;
  username?: string;
  nationalId?: string;
  contact?: string;
  email?: string;
}

export class Person {
  static add = (person: IPerson) =>
    axios.post<MyApiResponse<IPerson>>(ServerUrls.person.add, { ...person })
      .then((value) => value.data.data)
      .catch((error) => console.error(error));

  static view = (person: IPerson) =>
    axios.get<MyApiResponse<IPerson>>(ServerUrls.person.get, {
      params: { ...person },
    })
      .then((value) => value.data.data)
      .catch((error) => console.error(error));

  static list = (businessId: string) =>
    axios.get<MyApiResponse<IPerson[]>>(ServerUrls.person.get, {
      params: {
        business_id: businessId,
      },
    })
      .then((value) => value.data)
      .catch((error) => console.error(error));
}
