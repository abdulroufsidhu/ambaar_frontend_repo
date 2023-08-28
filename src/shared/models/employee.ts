import axios from "axios";
import { ServerUrls } from "../routes";
import { IBranch } from "./branch";
import { IUser } from "./user";
import { IPermission } from "./permission";
import { MyApiResponse } from "../unified-response";

export interface IEmployee {
  _id?: string;
  user?: IUser;
  branch?: IBranch;
  role?: string;
  permissions?: Array<IPermission | string>;
  status?: "active"|"inactive"
}

export class Employee {
  static add = (employee: IEmployee) =>
    axios.post<MyApiResponse<IEmployee>>(ServerUrls.employee.add, {
      ...employee,
    })
      .then((value) => value.data.data)
      .catch((error) => console.error(error));

  static view = (employee: IEmployee) =>
    axios.get<MyApiResponse<IEmployee>>(ServerUrls.employee.get, {
      params: { ...employee },
    })
      .then((value) => value.data.data)
      .catch((error) => console.error(error));

  static list = ({ user, branch }: IEmployee) => {
    const params: { uid?: string; branch_id?: string } = {};
    if (typeof user?._id === "string") {
      params["uid"] = user?._id;
    }
    if (typeof branch?._id === "string") {
      params["branch_id"] = branch?._id;
    }
    return axios<MyApiResponse<IEmployee[]>>({
      method: "get",
      url: ServerUrls.employee.get,
      params: params,
    })
      .then((value) => value.data.data)
      .catch((error) => console.error(error));
  };
}
