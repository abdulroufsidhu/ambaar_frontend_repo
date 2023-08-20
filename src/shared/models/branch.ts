import axios from "axios";
import { IBusiness } from "./business";
import { ServerUrls } from "../constants";

export interface IBranch {
  _id?: string;
  name?: string;
  contact?: string;
  email?: string;
  location?: string;
  business?: IBusiness;
}

export class Branch {
  static add = (branch: IBranch) =>
    axios<IBranch>({
      method: "post",
      url: ServerUrls.branch.add,
      data: { ...branch, business: branch.business?._id },
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
