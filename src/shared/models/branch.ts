import axios from "axios";
import { IBusiness } from "./business";
import { MyApiResponse } from "./unified-response";
import { IEmployee } from "./employee";
import { ServerUrls } from "../routes";
import { Permission } from "./permission";

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
    axios.post<MyApiResponse<IBranch>>(
      ServerUrls.branch.add,
      { ...branch, business: branch.business?._id, permissions: Permission.getAllPermissions().map(perm => perm._id) },
    )
      .then((value) => value.data.data)
      .catch((error) => console.error(error));

  static view = (branch: IBranch) =>
    axios.get<MyApiResponse<IBranch>>(ServerUrls.branch.get, {
      params: { ...branch },
    })
      .then((value) => value.data.data)
      .catch((error) => console.error(error));

  static update = (branch: IBranch) =>
    axios
      .patch<MyApiResponse<IEmployee>>(ServerUrls.branch.update, { ...branch })
      .then((value) => value.data.data);

  static remove = (id: string) =>
    axios
      .delete(ServerUrls.branch.remove, { params: { id: id } })
      .then((value) => value);

  static list = async (businessId: string) =>
    axios.get<MyApiResponse<IBranch[]>>(ServerUrls.branch.get, {
      params: { business_id: businessId, },
    })
      .then((value) => value.data.data)
      .catch((error) => console.error(error));

  private static loadedList: IBranch[] | undefined = [];

  public static setLoadedList(list: IBranch[] | undefined) { Branch.loadedList = list }
  public static getLoadedList(): IBranch[] | undefined { return Branch.loadedList }

}
