import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Business, IBusiness } from "../../shared/models/business";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MyFab } from "../../shared/components/fab";
import { routes } from "./router";
import { Add, Save, VisibilityOutlined } from "@mui/icons-material";

interface BusinessListProp {
  list?: Array<IBusiness>;
}

export const BusinessList = ({ list }: BusinessListProp) => {
  const navigate = useNavigate();
  console.log(list);
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
                  secondary={
                    <>
                      <Typography variant="body1">
                        ${business.email ?? ""}
                      </Typography>
                      {business.licence ?? ""}
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => navigate(routes.VIEW, { state: business })}
                  >
                    <VisibilityOutlined />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </>
          );
        })}
      </List>
      <MyFab
        label="Add IBusiness"
        startIcon={<Add />}
        onClick={() => {
          navigate(routes.ADD);
        }}
      />
    </>
  );
};

export const BusinessView = () => {
  const business = useLocation().state as IBusiness;

  return (
    <>
      <Stack>
        <Typography variant="h5">{business.name}</Typography>
        <Typography variant="subtitle1">{business.contact}</Typography>
        <Typography variant="subtitle1">{business.email}</Typography>
        <Typography variant="subtitle1">{business.licence}</Typography>
      </Stack>
    </>
  );
};

const businessReducer = (state: IBusiness, action: { payload?: IBusiness }) => {
  if (action.payload) {
    return { ...state, ...action.payload };
  }
  return state;
};

const businessReducerInitialValue: IBusiness = {};

export const BusinessAdd = () => {
  const [business, dispatch] = React.useReducer(
    businessReducer,
    businessReducerInitialValue
  );

  const handleSaveButtonClick = () => {
    Business.add(business).catch((error) => console.error(error));
  };

  return (
    <>
      <Stack spacing={2} margin={2}>
        <TextField
          label="Name*"
          onChange={(e) => {
            dispatch({ payload: { name: e.target.value } });
          }}
          value={business.name}
        />
        <TextField
          label="Contact"
          onChange={(e) => {
            dispatch({ payload: { contact: e.target.value } });
          }}
          value={business.contact}
        />
        <TextField
          label="Email*"
          onChange={(e) => {
            dispatch({ payload: { email: e.target.value } });
          }}
          value={business.email}
        />
        <TextField
          label="Licence"
          onChange={(e) => {
            dispatch({ payload: { licence: e.target.value } });
          }}
          value={business.licence}
        />
        <Typography variant="subtitle2">Founder Information</Typography>
        <TextField
          label="Founder Name"
          // onChange={(e) => {
          //   dispatch({
          //     payload: {
          //       founder: { ...business.founder, name: e.target.value },
          //     },
          //   });
          // }}
          // value={business.founder?.name}
        />
        <TextField
          label="Founder Contact"
          // onChange={(e) => {
          //   dispatch({
          //     payload: {
          //       founder: { ...business.founder, contact: e.target.value },
          //     },
          //   });
          // }}
          // value={business.founder?.contact}
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

export const BusinessMain = () => {
  return (
    <>
      <Stack justifyContent="center" alignItems="center" margin={2}>
        <Typography variant="h4">IBusiness</Typography>
        <Outlet />
      </Stack>
    </>
  );
};
