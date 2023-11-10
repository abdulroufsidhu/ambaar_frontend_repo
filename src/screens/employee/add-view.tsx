import {
  Stack,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
  Container,
} from "@mui/material";
import { useState, useReducer, useEffect } from "react";
import useAppContext from "../../shared/hooks/app-context";
import { IEmployee, Employee } from "../../shared/models/employee";
import { IPermission, Permission } from "../../shared/models/permission";
import { IUser, User } from "../../shared/models/user";
import { Signup } from "../auth";
import MyFullScreenDialog from "../../shared/components/my-popup";
import { IBranch } from "../../shared/models/branch";

const employeeReducer = (state: IEmployee, action: { payload?: IEmployee }) => {
  if (action.payload) {
    return { ...state, ...action.payload };
  }
  return state;
};

const employeeReducerInitialValue: IEmployee = {
  permissions: [],
};

interface EmployeeAddProps {
  employeeToEdit?: IEmployee;
  open: boolean;
  handleClose: () => void;
  onSuccess?: (employee: IEmployee | undefined) => void;
}

export const EmployeeAdd = ({
  employeeToEdit,
  open,
  handleClose,
  onSuccess,
}: EmployeeAddProps) => {
  const [context] = useAppContext();
  const [userAdded, setUserAdded] = useState<boolean>(
    employeeToEdit !== null && employeeToEdit !== undefined
  );
  const [employee, employeeDispatch] = useReducer(
    employeeReducer,
    employeeReducerInitialValue
  );

  const [allPermissionsToggled, setAllPermissionsToggled] = useState(false);

  // Function to toggle all permission switches
  const toggleAllPermissions = () => {
    setAllPermissionsToggled(!allPermissionsToggled);
    const permissions: string[] = Permission.getAllPermissions()
      .filter((permission) => !!permission && !!permission._id)
      .map((permission) => permission._id as string);

    if (!allPermissionsToggled) {
      // If "Toggle All" is on, set all permissions to "on"
      employeeDispatch({ payload: { permissions } });
    } else {
      // If "Toggle All" is off, clear all permissions
      employeeDispatch({ payload: { permissions: [] } });
    }
  };

  // Use useEffect to check if all individual permission switches are turned on,
  // and set the "Toggle All" switch accordingly

  useEffect(() => {
    employeeDispatch({
      payload: {
        ...employeeToEdit,
        /**
         * converts the IPermission[] into string[] of IPermission._id
         * while doing so it checks wheather each object is IPermission type and _id is not invalid i.e, null or undefined
         * and return based on that check
         * @return String[]
         */
        permissions: employeeToEdit?.permissions?.map((e) => (Permission.isIPermission(e) && e._id) ? e._id : e ) ?? [] ,
      },
    });
    setUserAdded(!!employeeToEdit);
  }, [employeeToEdit]);

  useEffect(() => {
    const allSwitchesToggled = Permission.getAllPermissions().every(
      (permission) => employee.permissions?.includes(permission._id ?? "")
    );
    setAllPermissionsToggled(allSwitchesToggled);
  }, [employee.permissions]);

  const handleChange = (key: keyof IEmployee, value: string|IUser|IBranch|string[]) => {
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
      payload: {
        _id: undefined,
        user: user,
        branch: context.branch,
        role: "",
        status: "active",
      },
    });
    setUserAdded(true);
  };

  const handleAddEmployee = () => {
    console.info("employee role assignment", employee);
    const toInvoke = employeeToEdit
      ? Employee.update(employee)
      : Employee.add(employee);
    toInvoke
      .then((response) => {
        if (response?.user?._id === User.getInstance()._id) {
          User.getInstance()?.jobs?.push(response!);
        }
        setUserAdded(false);
        !!onSuccess && !!response && onSuccess(response)
        handleClose();
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      {!userAdded ? (
        <Signup
          autoLogin={false}
          openState={open}
          handleCloseState={handleClose}
          onSuccess={handleSignup}
        />
      ) : (
        <MyFullScreenDialog
          open={open}
          handleClose={handleClose}
          title={userAdded ? "AddUser" : "Assign Role"}
          actions={[
            <Button autoFocus color="inherit" onClick={handleAddEmployee}>
              Assign
            </Button>,
          ]}
        >
          <Container>
            <Stack spacing={2} sx={{ m: 2 }}>
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
                  <FormControlLabel
                    control={
                      <Switch
                        checked={allPermissionsToggled}
                        onChange={toggleAllPermissions}
                        name="toggleAllPermissions"
                      />
                    }
                    label="Toggle All"
                  />
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
                                  ?.at(
                                    permission.name?.split("/").length - 1
                                  ) ?? ""
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
            </Stack>
          </Container>
        </MyFullScreenDialog>
      )}
    </>
  );
};
