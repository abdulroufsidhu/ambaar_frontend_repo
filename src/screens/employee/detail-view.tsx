import { Stack, Typography } from "@mui/material";
import { IEmployee } from "../../shared/models/employee";

export const EmployeeView = (employee: IEmployee) => {
  return (
    <>
      <Stack direction="row" flexWrap="wrap" spacing={2}>
        <Stack padding={4}>
          <Typography variant="h5">{employee.user?.person?.name}</Typography>
          <Typography variant="subtitle1">
            {employee.user?.person?.contact}
          </Typography>
          <Typography variant="subtitle1">
            {employee.user?.person?.email}
          </Typography>
          <Typography variant="subtitle1">
            {employee.user?.person?.nationalId}
          </Typography>
          <Typography variant="subtitle1">{employee.role}</Typography>
        </Stack>
      </Stack>
    </>
  );
};
