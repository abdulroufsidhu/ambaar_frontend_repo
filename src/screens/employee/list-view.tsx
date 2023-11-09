import { EditOutlined, GroupAddOutlined } from "@mui/icons-material";
import { IconButton, Box } from "@mui/material";
import { ReactNode, useState, useEffect } from "react";
import { EmployeeAdd } from ".";
import { MyFab } from "../../shared/components/buttons";
import { MyDataTable } from "../../shared/components/my-data-table";
import useAppContext from "../../shared/hooks/app-context";
import { IEmployee, Employee } from '../../shared/models/employee';
import { IPerson } from "../../shared/models/person";

interface EmployeeListProps {
  list?: IEmployee[];
}

interface IPersonActionable extends IPerson {
  actions?: ReactNode;
  role?: string;
  status?: string;
}

export const EmployeeList = ({ list }: EmployeeListProps) => {
  const [context, dispatch] = useAppContext();
  const [listState, setListState] = useState(list);
  const [persons, setPersons] = useState<IPersonActionable[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [employeeToEdit, setEmployeeToEdit] = useState<IEmployee | undefined>(
    undefined
  );
  const [addDialogOpened, setAddDialogOpened] = useState(false);

  const handleAddDialogClose = () => {
    setAddDialogOpened(false);
    setEmployeeToEdit(undefined);
  };

  const handleEditEmployee = (employee: IEmployee) => {
    setEmployeeToEdit(employee);
    setAddDialogOpened(true);
  };

  const onEmployeeAddOrEditSuccess = (employee?: IEmployee) => {
    setListState((prev) => {
      try {
        const found = prev?.filter((emp) => emp._id === employee?._id)?.at(0);
        if (!found){
          const t = prev && employee && [...prev, employee]
          const f = employee && [employee]
          const returnable = prev && employee ? t : f
          return returnable
        }
        const returnable = prev?.map(job=>job._id===employee?._id && employee ? employee : job)
        return returnable
      } catch (error) {
        console.error("error updating employee list on the ui",error);
        return prev
      }
    });
  };

  useEffect(() => {
    setListState(list);
  }, [list]);

  useEffect(() => {
    console.info("employees list", listState);
    setPersons(
      listState
        ?.filter((j) => !!j.user?.person)
        .map((j) => {
          return {
            role: j.role,
            ...j.user!.person!,
            status: j.status,
            actions: (
              <IconButton color="primary" onClick={() => handleEditEmployee(j)}>
                <EditOutlined />
              </IconButton>
            ),
          };
        }) ?? []
    );
  }, [listState]);

  useEffect(()=>{console.info("employeed persons",persons)},[persons])

  const handleAdd: () => undefined = () => {
    setAddDialogOpened(true);
    // console.log("handleAdd");
    // dispatch({
    //   action: "OPEN_POPUP",
    //   payload: { popupChild: <EmployeeAdd /> },
    // });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (number: number) => {
    setRowsPerPage(number);
    setPage(0);
  };

  if (!list) return <>Please Select a Branch</>;

  return (
    <Box width="100%">
      <MyDataTable<IPersonActionable>
        data={persons}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {!!context.branch && (
        <MyFab
          label="Add Employee"
          endIcon={<GroupAddOutlined />}
          onClick={handleAdd}
        />
      )}
      <EmployeeAdd
        employeeToEdit={employeeToEdit}
        open={addDialogOpened}
        handleClose={handleAddDialogClose}
        onSuccess={onEmployeeAddOrEditSuccess}
      />
    </Box>
  );
};
