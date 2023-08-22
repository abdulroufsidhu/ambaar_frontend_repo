import { Route, Routes } from "react-router-dom";
import { EmployeeList, EmployeeMain, EmployeeView } from ".";
import useAppContext from "../../shared/hooks/app-context";
import { useState, useEffect } from "react";
import { Employee, IEmployee } from "../../shared/models/employee";
import { ClientUrls } from "../../shared/routes";

export const EmployeeRoutes = () => {
  const [context, dispatch] = useAppContext();
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    console.info("fetching employees");
    Employee.list({ branch: context.branch })
      .then((list) => {
        setEmployees(list ?? []);
      })
      .catch((error) => {
        console.error(error), setEmployees([]);
      });
  }, [context.branch]);

  return (
    <Routes>
      <Route
        index
        element={<EmployeeList list={context.branch ? employees : undefined} />}
      />
      <Route path={ClientUrls.employee.view} element={<EmployeeView />} />
    </Routes>
  );
};
