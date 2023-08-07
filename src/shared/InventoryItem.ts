import { Item } from "./Item";

export interface InventoryItem {
  id?: string;
  item: Item;
  quantity?: number;
  buyPrice?: number;
  salePrice?: number;
}
