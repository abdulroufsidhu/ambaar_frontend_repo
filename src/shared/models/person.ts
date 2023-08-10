import axios from "axios";
import { ServerUrls } from "../constants";

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
    axios<IPerson>({
      method: "post",
      url: ServerUrls.person.add,
      data: { ...person },
    })
      .then((value) => value.data)
      .catch((error) => console.error(error));

  static view = (person: IPerson) =>
    axios<IPerson>({
      method: "get",
      url: ServerUrls.person.get,
      params: { ...person },
    })
      .then((value) => value.data)
      .catch((error) => console.error(error));

  static list = (businessId: string) =>
    axios<Array<IPerson>>({
      method: "get",
      url: ServerUrls.person.get,
      params: {
        business_id: businessId,
      },
    })
      .then((value) => value.data)
      .catch((error) => console.error(error));
}
