import axios from "axios";
import { ServerUrls } from "../constants";
import { IBranch } from "./branch";
import { IUser } from "./user";
import { IPermission } from "./permission";

export interface IEmployee {
  _id?: string;
  user?: IUser | string;
  branch?: IBranch | string;
  role?: string;
  permissions?: Array<IPermission | string>
}

export class Person {
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

  static list = (employee: IEmployee) => {
    const params: { uid?: string, branch_id?: string } = {}
    if (typeof employee.user == "string" && !!employee.user) {
      (params['uid'] = employee.user);
    }
    if (typeof employee.branch == "string" && !!employee.branch) {
      (params['branch_id'] = employee.branch);
    }
    return axios<Array<IEmployee>>({
      method: "get",
      url: ServerUrls.employee.get,
      params: params,
    })
      .then((value) => value.data)
      .catch((error) => console.error(error));
  }
}
