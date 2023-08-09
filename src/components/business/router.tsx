import { Route, Routes } from "react-router-dom";
import { BusinessAdd, BusinessList, BusinessMain, BusinessView } from "./";

export const BusinessRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BusinessMain />}>
        <Route index element={<BusinessList />} />
        <Route path={routes.VIEW} element={<BusinessView />} />
        <Route path={routes.ADD} element={<BusinessAdd />} />
      </Route>
    </Routes>
  );
};

export const routes = {
  VIEW: "view/",
  ADD: "add/",
};
