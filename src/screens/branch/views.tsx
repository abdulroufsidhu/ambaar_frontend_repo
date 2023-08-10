import {
  Box,
  Button,
  Chip,
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
import { Add, Save, VisibilityOutlined } from "@mui/icons-material";
import { useEffect, useReducer, useState } from "react";
import { IBusiness } from "../../shared/models/business";

interface BranchListProp {
  business: IBusiness;
}

export const BranchList = ({ business }: BranchListProp) => {
  const [branches, setBranches] = useState<Array<IBranch>>(() => []);
  const [activeBranch, setActiveBranch] = useState<IBranch>();

  useEffect(() => {
    Branch.list(business._id ?? "")
      .then((list) => {
        console.info(list);
        setBranches(list ?? []);
      })
      .catch((error) => { console.error(error); setBranches([]) });
    return () => setBranches([]);
  }, [business]);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} required>
      <InputLabel id="business-select-label">Business</InputLabel>
      <Select
        labelId="business-select-label"
        id="business-select"
        value={activeBranch?._id}
        label="Business"
        onChange={(e) => setActiveBranch(branches.filter(b => b._id === e.target.value)[0])}
        renderValue={() => (<>
          {
            (
              (!!activeBranch) && (<>
                <Typography variant="body1">
                  {activeBranch.name}
                </Typography>
                <Typography variant="caption">
                  {activeBranch.email}
                </Typography>
              </>)
            )
          }
        </>)}
      >
        {branches?.map(branch => (<MenuItem sx={{ display: "flex", flexDirection: "column" }} key={`${branch._id ?? ""}-menu name`} value={branch._id}>
          <Typography variant="body1">
            {branch.name}
          </Typography>
          <Typography variant="subtitle2">
            {branch.location}
          </Typography>
          <Typography variant="caption">
            {branch.contact}
          </Typography>
          <Typography variant="caption">
            {branch.email}
          </Typography>
        </MenuItem>))}
        <Button fullWidth ><Add /> Add Branch</Button>
      </Select>
    </FormControl>
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

interface BranchAddProps {
  businessId: string;
}

export const BranchAdd = ({ businessId }: BranchAddProps) => {
  const [branch, dispatch] = useReducer(
    branchReducer,
    branchReducerInitialValue
  );

  useEffect(() => {
    dispatch({
      payload: {
        ...branch,
        business: businessId,
      },
    });
  }, []);

  const handleSaveButtonClick = () => {
    console.log(branch);
    Branch.add(branch).catch((error) => console.error(error));
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
        <Button
          variant="outlined"
          endIcon={<Save />}
          onClick={handleSaveButtonClick}
        >
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
