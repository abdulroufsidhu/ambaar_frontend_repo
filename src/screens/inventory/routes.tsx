import { Route, Routes } from "react-router-dom";
import { InventoryItemList } from "./views";

export const ItemsRouting = () => (
  <Routes>
    <Route index element={<InventoryItemList />} />
  </Routes>
);
