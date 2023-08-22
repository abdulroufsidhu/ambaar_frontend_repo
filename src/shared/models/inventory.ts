import axios from "axios";
import { ServerUrls } from "../routes";
import { IBranch } from "./branch";

export interface IProduct {
  _id?: string;
  name?: string;
  detail?: string;
  colour?: string;
  variant?: string;
  serialNumber?: string;
  unitBuyPrice?: number;
  unitSellPrice?: number;
  unitDescountPrice?: number;
  quantity?: number;
}

export interface IInventory {
  product?: IProduct;
  branch?: IBranch;
}

export class Inventory {
  static list = (branch_id: string) =>
    axios
      .get<IInventory[]>(ServerUrls.inventory.get, {
        params: { branch_id },
      })
      .then((result) => result.data);

  static add = (inventory: IInventory) =>
    axios
      .post<IInventory>(ServerUrls.inventory.add, {
        ...inventory,
        branch: inventory.branch?._id,
      })
      .then((item) => item.data);

  static update = (Inventory: IInventory) =>
    axios.patch(ServerUrls.inventory.update, {
      ...Inventory,
      branch: Inventory.branch?._id,
    });
}
