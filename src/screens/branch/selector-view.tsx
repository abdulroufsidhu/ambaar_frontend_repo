import { AccountTreeOutlined, Add } from "@mui/icons-material";
import { FormControl, InputLabel, Select, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { BranchAdd } from ".";
import useAppContext from "../../shared/hooks/app-context";
import { IBranch } from "../../shared/models/branch";
import { IEmployee } from "../../shared/models/employee";

interface BranchListProps {
  branches: IBranch[];
  onAddSuccess: (job: IEmployee) => void
}

export const BranchSelector = ({ branches, onAddSuccess }: BranchListProps) => {
  const [context, dispatch] = useAppContext();

  const onAddSuccessLocal = (job: IEmployee) => {
    onAddSuccess(job)
    if (context.branch?._id == job.branch?._id) {
      dispatch({ action: "SET_BRANCH", payload: { branch: job.branch } });
    }
  };

  const handleEdit = (branch: IBranch) => {
    dispatch({
      action: "OPEN_POPUP",
      payload: {
        popupChild: <BranchAdd branch={branch} onSuccess={onAddSuccessLocal} />,
      },
    });
  };

  const handleAdd = () => {
    dispatch({
      action: "OPEN_POPUP",
      payload: {
        popupChild: <BranchAdd onSuccess={onAddSuccessLocal} />,
      },
    });
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} required>
        <InputLabel id="branch-select-label">Branch</InputLabel>
        <Select
          labelId="branch-select-label"
          id="branch-select"
          value={context.branch?._id}
          label="Branch"
          onChange={(e) =>
            dispatch({
              action: "SET_BRANCH",
              payload: {
                branch: branches.filter((b) => b._id === e.target.value)[0],
              },
            })
          }
          renderValue={() => (<> <AccountTreeOutlined /> {" "} {context.branch?.name}</>)}
        >
          {branches?.map((branch) => (
            <MenuItem
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                width: "100%",
              }}
              key={`${branch._id ?? ""}-menu name`}
              value={branch._id}
              dense={true}
              divider={true}
            >
              <ListItemIcon
                key={`${branch?._id ?? ""}-menu listItemIcon`}
              // onClick={() => handleEdit(branch)}
              >
                <AccountTreeOutlined />
                {/* <EditOutlined
                  key={`${branch?._id ?? ""}-menu listItemIcon edit`}
                  color="primary"
                /> */}
              </ListItemIcon>
              <ListItemText
                sx={{ whiteSpace: "pre-line" }}
                primary={branch.name}
                secondary={
                  (branch.email ? branch.email.concat("\n") : "") +
                  (branch.contact ? branch.contact : "")
                }
              />
            </MenuItem>
          ))}
          {(
            <MenuItem
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
              }}
              value={context.branch?._id}
              dense={true}
              divider={true}
              onClick={handleAdd}
            >
              <Add /> Add Branch
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </>
  );
};