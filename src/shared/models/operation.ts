import { IInventory } from "./inventory";
import { IEmployee } from "./employee";
import { IPerson } from "./person";
import axios from "axios";
import { MyApiResponse } from "../unified-response";
import { ServerUrls } from "../routes";

export interface IOperation {
  _id?: string;
  inventory?: IInventory;
  employee?: IEmployee;
  person?: IPerson;
  action?: "sale" | "purchase";
  quantity?: number;
  price?: number;
}

export class Operation {
  static add = async (operation: IOperation) =>
    axios
      .post<MyApiResponse<IOperation>>(ServerUrls.operation.add, {
				...operation,
        inventory: operation.inventory?._id,
        employee: operation.employee?._id,
      })
      .then((res) => res.data);

  static get = async (params: Record<string, string>) =>
    axios
      .get<MyApiResponse<IOperation[]>>(ServerUrls.operation.get, {
        params: params,
      })
      .then((res) => res.data);
}
