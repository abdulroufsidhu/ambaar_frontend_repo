import { Stack, FormControl, TextField, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Switch, Button } from "@mui/material";
import { useState, useReducer } from "react";
import useAppContext from "../../shared/hooks/app-context";
import { IEmployee, Employee } from "../../shared/models/employee";
import { IPermission, Permission } from "../../shared/models/permission";
import { IUser, User } from "../../shared/models/user";
import { Signup } from "../auth";

const employeeReducer = (state: IEmployee, action: { payload?: IEmployee }) => {
  if (action.payload) {
    return { ...state, ...action.payload };
  }
  return state;
};

const employeeReducerInitialValue: IEmployee = {
  permissions: [],
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
        [key]: value,
      },
    });
  };

  const togglePermission = (permission: IPermission) => {
    const permitted =
      (employee.permissions?.filter((perm) => perm === permission._id)
        ?.length ?? 0) > 0;
    if (!permitted) {
      employeeDispatch({
        payload: {
          permissions: [
            ...(employee.permissions! as string[]),
            permission._id!,
          ],
        },
      });
    } else {
      const newPerm = employee.permissions?.filter(
        (perm) => perm != permission._id
      );
      employeeDispatch({
        payload: {
          permissions: newPerm,
        },
      });
    }
  };

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
              <InputLabel id="employee-add-status-select-label">
                Status
              </InputLabel>
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
                {Permission.getAllPermissions().map((permission) => (
                  <>
                    {
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              (employee.permissions?.filter(
                                (perm) => perm === permission._id
                              )?.length ?? 0) > 0
                            }
                            onChange={() => togglePermission(permission)}
                            name={
                              permission.name
                                ?.split("/")
                                .map((perm) => perm.concat(" "))
                                ?.at(permission.name?.split("/").length - 1) ??
                              ""
                            }
                          />
                        }
                        label={permission.name
                          ?.split("/")
                          .map((perm) => perm.concat(" "))}
                      />
                    }
                  </>
                ))}
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
