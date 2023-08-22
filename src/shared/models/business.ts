import { IPerson } from "./person";
import axios from "axios";
import { ServerUrls } from "../routes";
import { IEmployee } from "./employee";

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
  static delete = (id: string) =>
    axios
      .delete<IBusiness>(ServerUrls.business.remove, { params: { id: id } })
      .then((value) => value.data);

  static update = (business: IBusiness) =>
    axios
      .patch<IBusiness>(ServerUrls.business.update, {
        ...business,
      })
      .then((value) => value.data);

  static add = (user_id: string, business: IBusiness) =>
    axios<IEmployee>({
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
