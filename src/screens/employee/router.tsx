import { Route, Routes } from "react-router-dom";
import { EmployeeAdd, EmployeeList, EmployeeMain, EmployeeView } from ".";
import useAppContext from "../../shared/hooks/app-context";
import { useState, useEffect } from "react";
import { Employee, IEmployee } from "../../shared/models/employee";
import { User } from "../../shared/models/user";

export const EmployeeRoutes = () => {
  const [context, dispatch] = useAppContext();
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    console.info("fetching employees");
    Employee.list({ branch: context.branch })
      .then((list) => {
        console.info("employees", list);
        setEmployees(list ?? []);
      })
      .catch((error) => {
        console.error(error), setEmployees([]);
      });
  }, [context.branch]);

  return (
    <Routes>
      <Route path="/" element={<EmployeeMain />}>
        <Route
          index
          element={
            <EmployeeList list={context.branch ? employees : undefined} />
          }
        />
        <Route path={routes.VIEW} element={<EmployeeView />} />
        <Route path={routes.ADD} element={<EmployeeAdd />} />
      </Route>
    </Routes>
  );
};

export const routes = {
  VIEW: "view/",
  ADD: "add/",
};
