import { Route, Routes } from "react-router-dom";
import { BusinessAdd, BusinessList, BusinessMain, BusinessView } from "./";
import { useState, useEffect } from "react";
import { Business, IBusiness } from "../../shared/models/business";

export const BusinessRoutes = () => {
  const [businesses, setBusinesses] = useState<IBusiness[]>(() => []);

  useEffect(() => {
    Business.list()
      .then((list) => setBusinesses(list ?? []))
      .catch((error) => console.error(error));
    return () => setBusinesses([]);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<BusinessMain />}>
        <Route index element={<BusinessList list={businesses} />} />
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
