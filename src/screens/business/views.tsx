import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Business } from "../../shared/models/business";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MyFab } from "../../shared/components/fab";
import { routes } from "./router";
import { Add, Save, ViewAgenda } from "@mui/icons-material";

interface BusinessListProp {
  list?: Array<Business>;
}

export const BusinessList = ({ list }: BusinessListProp) => {
  const navigate = useNavigate();
  return (
    <>
      <List>
        {list?.map((business) => {
          return (
            <>
              <ListItem
                key={`${business.name ?? ""}-${business.email ?? ""}-list-item`}
                sx={{ marginBlock: 2 }}
              >
                <ListItemText
                  key={`${business.name ?? ""}-${business.email ?? ""}`}
                  primary={business.name}
                  secondary={`${business.email ?? ""}\n${business.licence ?? ""
                    }`}
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
        label="Add Business"
        startIcon={<Add />}
        onClick={() => {
          navigate(routes.ADD);
        }}
      />
    </>
  );
};

export const BusinessView = () => {
  const business = useLocation().state as Business;

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h5">{business.name}</Typography>
        <Typography variant="subtitle1">{business.contact}</Typography>
        <Typography variant="subtitle1">{business.email}</Typography>
        <Typography variant="subtitle1">{business.licence}</Typography>
      </Stack>
    </>
  );
};

const businessReducer = (state: Business, action: { payload?: Business }) => {
  if (action.payload) {
    return { ...state, ...action.payload };
  }
  return state;
};

const businessReducerInitialValue: Business = {};

export const BusinessAdd = () => {
  const [state, dispatch] = React.useReducer(
    businessReducer,
    businessReducerInitialValue
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
          label="Licence"
          onChange={(e) => {
            dispatch({ payload: { licence: e.target.value } });
          }}
          value={state.licence}
        />
        <Typography variant="subtitle2">Founder Information</Typography>
        <TextField label="Founder Name" />
        <TextField label="Founder Contact" />
        <Button variant="outlined" endIcon={<Save />}>
          Save
        </Button>
      </Stack>
    </>
  );
};

export const BusinessMain = () => {
  return (
    <>
      <Stack justifyContent="center" alignItems="center" margin={2}>
        <Typography variant="h4" >Business</Typography>
        <Outlet />
      </Stack>
    </>
  );
};
