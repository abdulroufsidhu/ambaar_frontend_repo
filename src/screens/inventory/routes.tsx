import { Route, Routes } from "react-router-dom";
import ListItems from "./list-items";
import AddItem from "./add-item";
import ItemDetails from "./item-details";
import { InventoryItemList } from "./views";

export const ItemsRouting = () => (
  <Routes>
    <Route index element={<InventoryItemList />} />
    <Route path={ROUTES.ADD} element={<AddItem />} />
    <Route path={ROUTES.VIEW} element={<ItemDetails />} />
  </Routes>
);

export const ROUTES = {
  ADD: "/add",
  VIEW: "/:id",
};