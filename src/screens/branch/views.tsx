import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { Branch, IBranch } from "../../shared/models/branch";
import { Add, Save } from "@mui/icons-material";
import { useEffect, useReducer, useState } from "react";
import useAppContext from "../../shared/hooks/app-context";

export const BranchList = () => {
  const [branches, setBranches] = useState<Array<IBranch>>(() => []);
  const [context, dispatch] = useAppContext();

  useEffect(() => {
    dispatch({ action: "CLEAR_BRANCH" });
    Branch.list(context.business?._id ?? "")
      .then((list) => {
        setBranches(list ?? []);
      })
      .catch((error) => {
        console.error(error);
        setBranches([]);
      });
    return () => setBranches([]);
  }, [context.business]);

  const handleAdd = () => {
    dispatch({
      action: "OPEN_POPUP",
      payload: {
        popupChild: <BranchAdd />,
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
          renderValue={() => (
            <>
              {!!context.branch && (
                <>
                  <Typography variant="body1">{context.branch.name}</Typography>
                </>
              )}
            </>
          )}
        >
          {branches?.map((branch) => (
            <MenuItem
              sx={{ display: "flex", flexDirection: "column" }}
              key={`${branch._id ?? ""}-menu name`}
              value={branch._id}
            >
              <Typography variant="body1">{branch.name}</Typography>
              <Typography variant="subtitle2">{branch.location}</Typography>
              <Typography variant="caption">{branch.contact}</Typography>
              <Typography variant="caption">{branch.email}</Typography>
            </MenuItem>
          ))}
          <Button fullWidth onClick={handleAdd}>
            <Add /> Add Branch
          </Button>
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

const branchReducer = (state: IBranch, action: { payload?: IBranch }) => {
  if (action.payload) {
    return { ...state, ...action.payload };
  }
  return state;
};

const branchReducerInitialValue: IBranch = {};

export const BranchAdd = () => {
  const [context, contextDispatch] = useAppContext();
  if (!context.business) {
    contextDispatch({ action: "CLOSE_POPUP" });
  }
  const [branch, dispatch] = useReducer(
    branchReducer,
    branchReducerInitialValue
  );

  useEffect(() => {
    dispatch({
      payload: {
        ...branch,
        business: context.business?._id,
      },
    });
  }, []);

  const handleSave = () => {
    Branch.add(branch)
      .then(() => contextDispatch({ action: "CLOSE_POPUP" }))
      .catch((error) => console.error(error));
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
