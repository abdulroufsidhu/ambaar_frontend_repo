import axios from "axios";
import { IBusiness } from "./business";
import { ServerUrls } from "../constants";
import { IEmployee } from "./employee";

export interface IBranch {
  _id?: string;
  name?: string;
  contact?: string;
  email?: string;
  location?: string;
  business?: IBusiness;
}

export class Branch {
  static add = (userId: string, branch: IBranch) =>
    axios<IEmployee>({
      method: "post",
      url: ServerUrls.branch.add,
      data: { ...branch, business: branch.business?._id, user_id: userId },
    })
      .then((value) => value.data)
      .catch((error) => console.error(error));

  static view = (branch: IBranch) =>
    axios<IBranch>({
      method: "get",
      url: ServerUrls.branch.get,
      params: { ...branch },
    })
      .then((value) => value.data)
      .catch((error) => console.error(error));

  static update = (branch: IBranch) =>
    axios
      .patch<IEmployee>(ServerUrls.branch.update, { ...branch })
      .then((value) => value.data);

  static remove = (id: string) =>
    axios
      .delete(ServerUrls.branch.remove, { params: { id: id } })
      .then((value) => value);

  static list = (businessId: string) =>
    axios<Array<IBranch>>({
      method: "get",
      url: ServerUrls.branch.get,
      params: {
        business_id: businessId,
      },
    })
      .then((value) => value.data)
      .catch((error) => console.error(error));
}
