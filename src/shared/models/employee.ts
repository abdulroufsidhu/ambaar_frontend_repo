import axios from "axios";
import { ServerUrls } from "../constants";
import { IBranch } from "./branch";
import { IUser } from "./user";
import { IPermission } from "./permission";

export interface IEmployee {
  _id?: string;
  user?: IUser;
  branch?: IBranch;
  role?: string;
  permissions?: Array<IPermission | string>;
}

export class Employee {
  static add = (employee: IEmployee) =>
    axios<IEmployee>({
      method: "post",
      url: ServerUrls.employee.add,
      data: { ...employee },
    })
      .then((value) => value.data)
      .catch((error) => console.error(error));

  static view = (employee: IEmployee) =>
    axios<IEmployee>({
      method: "get",
      url: ServerUrls.employee.get,
      params: { ...employee },
    })
      .then((value) => value.data)
      .catch((error) => console.error(error));

  static list = ({ user, branch }: IEmployee) => {
    const params: { uid?: string; branch_id?: string } = {};
    if (typeof user?._id === "string") {
      params["uid"] = user?._id;
    }
    if (typeof branch?._id === "string") {
      params["branch_id"] = branch?._id;
    }
    return axios<Array<IEmployee>>({
      method: "get",
      url: ServerUrls.employee.get,
      params: params,
    })
      .then((value) => value.data)
      .catch((error) => console.error(error));
  };
}
