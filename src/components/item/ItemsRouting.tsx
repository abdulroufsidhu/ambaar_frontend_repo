import { Route, Routes } from "react-router-dom";
import ListItems from "./ListItems";
import AddItem from "./AddItem";
import ItemDetails from "./ItemDetails";

function ItemsRouting() {
  return (
    <Routes>
      <Route index element={<ListItems />} />
      <Route path="/add" element={<AddItem />} />
      <Route path="/:id" element={<ItemDetails />} />
    </Routes>
  );
}

export default ItemsRouting;
