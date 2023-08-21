import {
  Button,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { Branch, IBranch } from "../../shared/models/branch";
import { Add, EditOutlined, Save } from "@mui/icons-material";
import { useEffect, useReducer, useState } from "react";
import useAppContext from "../../shared/hooks/app-context";
import { IBusiness } from "../../shared/models/business";
import { User } from "../../shared/models/user";
import { IEmployee } from "../../shared/models/employee";

interface BranchListProps {
  business?: IBusiness;
}

export const BranchList = ({ business }: BranchListProps) => {
  const [branches, setBranches] = useState<IBranch[]>(() => []);
  const [context, dispatch] = useAppContext();

  const onAddSuccess = (job: IEmployee) => {
    if (job.branch) {
      setBranches((prev) => {
        const newState: IBranch[] = prev.map((b) =>
          b._id === job.branch?._id ? job.branch! : b
        );
        const index = newState.indexOf(job.branch!);
        if (index < 0) {
          job.branch && newState.push(job.branch);
        }
        return newState;
      });
    }
    if (context.branch?._id == job.branch?._id) {
      dispatch({ action: "SET_BRANCH", payload: { branch: job.branch } });
    }
  };

  useEffect(() => {
    dispatch({ action: "CLEAR_BRANCH" });
    setBranches(
      User.getInstance()
        .jobs?.filter((j) => j.branch?.business?._id === business?._id)
        .map((j) => {
          console.info("branches", j);
          return j.branch ?? {};
        }) ?? []
    );
    // Branch.list(business?._id ?? "")
    //   .then((list) => {
    //     setBranches(list ?? []);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setBranches([]);
    //   });
    return () => setBranches([]);
  }, [business]);

  const handleEdit = (branch: IBranch) => {
    dispatch({
      action: "OPEN_POPUP",
      payload: {
        popupChild: <BranchAdd branch={branch} onSuccess={onAddSuccess} />,
      },
    });
  };

  const handleAdd = () => {
    dispatch({
      action: "OPEN_POPUP",
      payload: {
        popupChild: <BranchAdd onSuccess={onAddSuccess} />,
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
          renderValue={() => context.branch?.name}
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
                onClick={() => handleEdit(branch)}
              >
                <EditOutlined
                  key={`${branch?._id ?? ""}-menu listItemIcon edit`}
                  color="primary"
                />
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
          {!!business && (
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

interface BranchViewProps {
  branch: IBranch;
}

export const BranchView = ({ branch }: BranchViewProps) => {
  return (
    <>
      <Stack padding={2}>
        <Typography variant="h5">{branch.name}</Typography>
        {typeof branch.business != "string" && !!branch.business?.name && (
          <Typography variant="h6">{branch.business?.name}</Typography>
        )}
        <Typography variant="subtitle1">{branch.contact}</Typography>
        <Typography variant="subtitle1">{branch.email}</Typography>
        <Typography variant="subtitle1">{branch.location}</Typography>
      </Stack>
    </>
  );
};

interface BranchAddProps {
  branch?: IBranch;
  onSuccess?: (branch: IBranch) => void;
}

const branchReducer = (state: IBranch, action: { payload?: IBranch }) => {
  if (action.payload) {
    return { ...state, ...action.payload };
  }
  return state;
};

export const BranchAdd = ({
  branch: paramBranch,
  onSuccess,
}: BranchAddProps) => {
  const [context, contextDispatch] = useAppContext();
  if (!context.business) {
    contextDispatch({ action: "CLOSE_POPUP" });
  }
  const [branch, dispatch] = useReducer(
    branchReducer,
    paramBranch ?? { business: context.business }
  );

  const handleSave = () => {
    if (!paramBranch) {
      Branch.add(User.getInstance()._id ?? "", branch)
        .then((job) => {
          if (job) {
            User.addJob(job);
            !!onSuccess && onSuccess(job);
            contextDispatch({ action: "CLOSE_POPUP" });
          }
        })
        .catch((error) => console.error(error));
    } else {
      Branch.update(branch)
        .then(() => {
          const j = User.getInstance().jobs?.filter(
            (j) => j.branch?._id === branch._id
          );
          if (!!j && j.length > 0) {
            const fj = { ...j[0], branch };
            User.updateJob(fj);
            !!onSuccess && onSuccess(fj);
            contextDispatch({ action: "CLOSE_POPUP" });
          }
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <Stack spacing={2} padding={2}>
        <TextField
          label="Name*"
          onChange={(e) => {
            dispatch({ payload: { name: e.target.value } });
          }}
          value={branch.name}
        />
        <TextField
          label="Contact"
          onChange={(e) => {
            dispatch({ payload: { contact: e.target.value } });
          }}
          value={branch.contact}
        />
        <TextField
          label="Email*"
          onChange={(e) => {
            dispatch({ payload: { email: e.target.value } });
          }}
          value={branch.email}
        />
        <TextField
          label="Location*"
          onChange={(e) => {
            dispatch({ payload: { location: e.target.value } });
          }}
          value={branch.location}
        />
        <Button variant="outlined" endIcon={<Save />} onClick={handleSave}>
          Save
        </Button>
      </Stack>
    </>
  );
};

export const BranchMain = () => {
  return (
    <Stack justifyContent="center" alignItems="center" margin={2}>
      <Outlet />
    </Stack>
  );
};
