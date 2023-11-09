import axios from "axios";
import { MyApiResponse } from "../unified-response";
import { ServerUrls } from "../routes";
import { SessionStorageManager } from "../utils/session-storage";

export interface IPermission {
  _id?: string;
  name?: string;
}

export class Permission {
  private static allPermissions: IPermission[] = [];

  static getAllPermissions = (): IPermission[] => {
    if (Permission.allPermissions.length <= 0) {
      console.info("reading permissions");
      Permission.allPermissions =
        SessionStorageManager.getItem<Permission[]>("permissions") ?? [];
      console.info("permissions read", this.allPermissions);
    }
    return Permission.allPermissions;
  };

  static fetchAll = async () => {
    try {
      Permission.allPermissions =
        SessionStorageManager.getItem<IPermission[]>("permissions") ?? [];
      if (Permission.allPermissions.length > 0) {
        return Permission.allPermissions;
      }
      const response = await axios.get<MyApiResponse<IPermission[]>>(
        ServerUrls.permissions.get,
        {}
      );
      Permission.allPermissions = response.data.data ?? [];
    } catch (e) {
      console.error(e);
    }
    return Permission.allPermissions;
  };
}
