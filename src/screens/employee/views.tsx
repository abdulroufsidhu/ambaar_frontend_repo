import {
  Button,
  Divider,
  FormControl,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { IEmployee, Employee } from "../../shared/models/employee";
import { IUser, User } from "../../shared/models/user";
import useAppContext from "../../shared/hooks/app-context";
import { Signup } from "../auth";
import { useReducer, useState } from "react";
import { Box } from "@mui/material";
import { MyFab } from "../../shared/components/buttons";
import { GroupAddOutlined } from "@mui/icons-material";

const employeeReducer = (state: IEmployee, action: { payload?: IEmployee }) => {
  if (action.payload) {
    return { ...state, ...action.payload };
  }
  return state;
};

const employeeReducerInitialValue: IEmployee = {};

export const EmployeeAdd = () => {
  const [context, dispatch] = useAppContext();
  const [userAdded, setUserAdded] = useState(false);
  const [employee, employeeDispatch] = useReducer(
    employeeReducer,
    employeeReducerInitialValue
  );

  const handleSignup: (user: IUser) => undefined = (user: IUser) => {
    console.info("employee user signup", user);
    employeeDispatch({
      payload: { user: user, branch: context.branch },
    });
    setUserAdded(true);
  };

  const handleAddEmployee = () => {
    console.info(employee);
    Employee.add(employee)
      .then((response) => {
        !!response && User.getInstance()?.jobs?.push(response);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Stack spacing={2}>
        {userAdded ? (
          <>
            <FormControl required>
              <TextField
                label="Role"
                value={employee.role}
                onChange={(e) =>
                  employeeDispatch({ payload: { role: e.target.value } })
                }
              />
            </FormControl>
            <Button onClick={handleAddEmployee}>Add Employee</Button>
          </>
        ) : (
          <Signup onSuccess={handleSignup} />
        )}
      </Stack>
    </>
  );
};

interface EmployeeListProps {
  list: IEmployee[];
}

export const EmployeeList = ({ list }: EmployeeListProps) => {
  const [context, dispatch] = useAppContext();

  const handleAdd: () => undefined = () => {
    console.log("handleAdd");
    dispatch({
      action: "OPEN_POPUP",
      payload: { popupChild: <EmployeeAdd /> },
    });
  };

  return (
    <Box width="100%">
      <List key="employee.views.list">
        {list.map((employee, index) => (
          <>
            <ListItem key={`employee.views.list-${employee._id ?? ""}`}>
              <ListItemText
                key={`employee.views.list-${employee._id ?? ""}-name${
                  employee.user?.person?.name ?? index.toString()
                }`}
                primary={employee.user?.person?.name}
                secondary={employee.role}
              />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
      {!!context.branch && (
        <MyFab
          label="Add Employee"
          endIcon={<GroupAddOutlined />}
          onClick={handleAdd}
        />
      )}
    </Box>
  );
};

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

export const EmployeeMain = () => {
  return (
    <>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        margin={2}
      >
        <Outlet />
      </Stack>
    </>
  );
};
