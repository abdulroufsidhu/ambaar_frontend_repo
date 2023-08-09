import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Branch } from "../../shared/models/branch";
import { ViewAgenda, Add, Save } from "@mui/icons-material";
import { MyFab } from "../../shared/components/fab";
import { routes } from "./";
import { useReducer } from "react";

interface BranchListProp {
  list?: Array<Branch>;
}

export const BranchList = ({ list }: BranchListProp) => {
  const navigate = useNavigate();
  return (
    <>
      <List>
        {list?.map((branch) => {
          return (
            <>
              <ListItem
                key={`${branch.name ?? ""}-${branch.email ?? ""}-list-item`}
                sx={{ marginBlock: 2 }}
              >
                <ListItemText
                  key={`${branch.name ?? ""}-${branch.email ?? ""}`}
                  primary={branch.name}
                  secondary={`${branch.location} - ${branch.email ?? ""}`}
                />
              </ListItem>
              <ListItemSecondaryAction>
                <ViewAgenda />
              </ListItemSecondaryAction>
            </>
          );
        })}
      </List>
      <MyFab
        label="Add Branch"
        startIcon={<Add />}
        onClick={() => {
          navigate(routes.ADD);
        }}
      />
    </>
  );
};


export const BranchView = () => {
  const branch = useLocation().state as Branch;

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h5">{branch.name}</Typography>
        <Typography variant="subtitle1">{branch.contact}</Typography>
        <Typography variant="subtitle1">{branch.email}</Typography>
        <Typography variant="subtitle1">{branch.location}</Typography>
      </Stack>
    </>
  );
};


const branchReducer = (state: Branch, action: { payload?: Branch }) => {
  if (action.payload) {
    return { ...state, ...action.payload };
  }
  return state;
};


const branchReducerInitialValue: Branch = {};

export const BranchAdd = () => {
  const [state, dispatch] = useReducer(
    branchReducer,
    branchReducerInitialValue
  );

  return (
    <>
      <Stack spacing={2} margin={2}>
        <TextField
          label="Name*"
          onChange={(e) => {
            dispatch({ payload: { name: e.target.value } });
          }}
          value={state.name}
        />
        <TextField
          label="Contact"
          onChange={(e) => {
            dispatch({ payload: { contact: e.target.value } });
          }}
          value={state.contact}
        />
        <TextField
          label="Email*"
          onChange={(e) => {
            dispatch({ payload: { email: e.target.value } });
          }}
          value={state.email}
        />
        <TextField
          label="Location*"
          onChange={(e) => {
            dispatch({ payload: { location: e.target.value } });
          }}
          value={state.location}
        />
        <Button variant="outlined" endIcon={<Save />}>
          Save
        </Button>
      </Stack>
    </>
  );
};

export const BranchMain = () => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Outlet />
    </Stack>
  );
}


