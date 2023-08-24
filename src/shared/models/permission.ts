import axios from "axios";
import { MyApiResponse } from "../unified-response";
import { ServerUrls } from "../routes";

export interface IPermission {
  _id?: string;
  name?: string;
}

export class Permission {
  static list = () =>
    axios
      .get<MyApiResponse<IPermission[]>>(ServerUrls.permissions.get, {})
      .then((permissions) => permissions.data.data)
      .catch((error) => console.error(error));
}
