import { Route, Routes } from "react-router-dom";
import { InventoryItemList } from "./list";

export const ItemsRoutes = () => (
  <Routes>
    <Route index element={<InventoryItemList />} />
  </Routes>
);
