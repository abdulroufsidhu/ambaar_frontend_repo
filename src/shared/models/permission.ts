import axios from "axios";
import { ServerUrls } from "../constants";

export interface IPermission {
  _id?: string;
  name?: string;
}

export class Permission {
  static list = () => axios
    .get<IPermission[]>(ServerUrls.permissions.get, {})
    .then(permissions => permissions)
    .catch(error => console.error(error))

}
