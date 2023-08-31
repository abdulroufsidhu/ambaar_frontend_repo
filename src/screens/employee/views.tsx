import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { IEmployee, Employee } from "../../shared/models/employee";
import { IUser, User } from "../../shared/models/user";
import useAppContext from "../../shared/hooks/app-context";
import { Signup } from "../auth";
import { useReducer, useState, useEffect, ReactNode } from "react";
import { Box } from "@mui/material";
import { MyFab } from "../../shared/components/buttons";
import { GroupAddOutlined, EditOutlined } from '@mui/icons-material';
import { MyDataTable } from "../../shared/components/my-data-table";
import { IPerson } from "../../shared/models/person";
import { IPermission, Permission } from "../../shared/models/permission";

const employeeReducer = (state: IEmployee, action: { payload?: IEmployee }) => {
  if (action.payload) {
    return { ...state, ...action.payload };
  }
  return state;
};

const employeeReducerInitialValue: IEmployee = {
  permissions: []
};

export const EmployeeAdd = () => {
  const [context, dispatch] = useAppContext();
  const [userAdded, setUserAdded] = useState(false);
  const [employee, employeeDispatch] = useReducer(
    employeeReducer,
    employeeReducerInitialValue
  );

  const handleChange = (key: keyof IEmployee, value: any) => {
    employeeDispatch({
      payload: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        [key]: value
      }
    })
  }

  const togglePermission = (permission: IPermission) => {
    const permitted = (employee.permissions?.filter(perm => perm === permission._id)?.length ?? 0) > 0
    if (!permitted) {
      employeeDispatch({
        payload: {
          permissions: [...employee.permissions! as string[], permission._id!]
        }
      })
    } else {
      const newPerm = employee.permissions?.filter(perm => perm != permission._id)
      employeeDispatch({
        payload: {
          permissions: newPerm
        }
      })
    }
  }

  const handleSignup = (user: IUser | undefined) => {
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
        dispatch({ action: "CLOSE_POPUP" });
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
                onChange={(e) => handleChange("role", e.target.value)}
              />
            </FormControl>
            <FormControl required>
              <InputLabel id="employee-add-status-select-label">Status</InputLabel>
              <Select
                labelId="employee-add-status-select-label"
                id="employee-add-status-select"
                value={employee.status}
                label="Status"
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormGroup>
                {
                  Permission.getAllPermissions().map(permission =>
                  (<>
                    {
                      <FormControlLabel
                        control={
                          <Switch
                            checked={(employee.permissions?.filter(perm => perm === permission._id)?.length ?? 0) > 0}
                            onChange={() => togglePermission(permission)}
                            name={permission.name?.split('/').map(perm => perm.concat(" ")) ?? ""}
                          />

                        }
                        label={permission.name?.split('/').map(perm => perm.concat(" "))}
                      />
                    }
                  </>)
                  )
                }
              </FormGroup>
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
  list?: IEmployee[];
}

interface IPersonActionable extends IPerson {
  actions?: ReactNode;
}

export const EmployeeList = ({ list }: EmployeeListProps) => {
  const [context, dispatch] = useAppContext();
  const [persons, setPersons] = useState<IPersonActionable[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setPersons(
      list
        ?.filter((j) => !!j.user?.person)
        .map((j) => {
          return {
            ...j.user!.person!,
            actions: <IconButton color="primary" ><EditOutlined /></IconButton>
          };
        }) ?? []
    );
  }, [list]);

  const handleAdd: () => undefined = () => {
    console.log("handleAdd");
    dispatch({
      action: "OPEN_POPUP",
      payload: { popupChild: <EmployeeAdd /> },
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (number: number) => {
    setRowsPerPage(number);
    setPage(0);
  };

  if (!list) return <>Please Select a Branch</>;

  console.log(persons);

  return (
    <Box width="100%">
      <MyDataTable<IPerson>
        data={persons}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* <List key="employee.views.list">
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
      </List> */}
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
