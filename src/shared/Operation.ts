import { InventoryItem } from "./InventoryItem";
import { Person, User } from "./User";

export interface Operation {
  id?: string;
  item: InventoryItem;
  person: Person;
  operation: "sale" | "purchase";
  reference?: Person;
  operator: User;
}
