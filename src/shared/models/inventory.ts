import axios from "axios";
import { ServerUrls } from "../routes";
import { IBranch } from "./branch";
import { MyApiResponse } from "../unified-response";

export interface IProduct {
  _id?: string;
  name?: string;
  detail?: string;
  colour?: string;
  variant?: string;
}

export interface IInventory {
  _id?: string;
  product?: IProduct;
  branch?: IBranch;
  serialNumber?: string;
  unitBuyPrice?: number;
  unitSellPrice?: number;
  unitDescountPrice?: number;
  quantity?: number;
}

export class Inventory {
  private static list?: IInventory[] = [];

  static getList = Inventory.list;

  static fetch = (branch_id: string) =>
    axios
      .get<MyApiResponse<IInventory[]>>(ServerUrls.inventory.get, {
        params: { branch_id },
      })
      .then((result) => {
        Inventory.list = result.data.data;
        return result.data.data;
      });

  static add = (inventory: IInventory) =>
    axios
      .post<MyApiResponse<IInventory | undefined>>(ServerUrls.inventory.add, {
        ...inventory,
        branch: inventory.branch?._id,
      })
      .then((item) => (item.data.data ? item.data.data : []));

  static update = (Inventory: IInventory) =>
    axios.patch(ServerUrls.inventory.update, {
      ...Inventory,
      branch: Inventory.branch?._id,
    });
}
