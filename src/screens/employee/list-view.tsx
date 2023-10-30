import { EditOutlined, GroupAddOutlined } from "@mui/icons-material";
import { IconButton, Box } from "@mui/material";
import { ReactNode, useState, useEffect } from "react";
import { EmployeeAdd } from ".";
import { MyFab } from "../../shared/components/buttons";
import { MyDataTable } from "../../shared/components/my-data-table";
import useAppContext from "../../shared/hooks/app-context";
import { IEmployee } from "../../shared/models/employee";
import { IPerson } from "../../shared/models/person";

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
            actions: (
              <IconButton color="primary">
                <EditOutlined />
              </IconButton>
            ),
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
