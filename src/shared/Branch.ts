import { InventoryItem } from "./InventoryItem";

export interface Branch {
  id?: string;
  code?: string;
  codeName?: string;
  location: Location;
  inventory: InventoryItem[];
}
