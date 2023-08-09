import { Route, Routes } from "react-router-dom";
import { BranchAdd, BranchList, BranchMain, BranchView } from ".";

export const BranchRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BranchMain />}>
        <Route index element={<BranchList />} />
        <Route path={routes.VIEW} element={<BranchView />} />
        <Route path={routes.ADD} element={<BranchAdd />} />
      </Route>
    </Routes>
  );
};

export const routes = {
  VIEW: "view/",
  ADD: "add/",
};
