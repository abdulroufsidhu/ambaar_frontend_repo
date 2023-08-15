import { IPerson } from "./person";
import axios from "axios";
import { ServerUrls } from "../constants";

export interface IBusiness {
  _id?: string;
  name?: string;
  email?: string;
  contact?: string;
  licence?: string;
  location?: string;
  founder?: IPerson | string;
}

export class Business {
  static add = (user_id: string, business: IBusiness) =>
    axios<IBusiness>({
      method: "post",
      url: ServerUrls.business.add,
      data: { user_id, ...business },
    })
      .then((value) => value.data)
      .catch((error) => console.error(error));

  static view = (business: IBusiness) =>
    axios<IBusiness>({
      method: "get",
      url: ServerUrls.business.get,
      params: { ...business },
    })
      .then((value) => value.data)
      .catch((error) => console.error(error));

  static list = () =>
    axios<Array<IBusiness>>({
      method: "get",
      url: ServerUrls.business.get,
    })
      .then((value) => value.data)
      .catch((error) => console.error(error));
}
