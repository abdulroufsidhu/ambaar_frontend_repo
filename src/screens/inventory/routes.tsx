import { Route, Routes } from "react-router-dom";
import { InventoryItemList } from "./views";

export const ItemsRoutes = () => (
  <Routes>
    <Route index element={<InventoryItemList />} />
  </Routes>
);
