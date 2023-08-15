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
import { Business, IBusiness } from "../../shared/models/business";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Add, Save } from "@mui/icons-material";
import { BranchList } from "../branch";
import useAppContext from "../../shared/hooks/app-context";

interface BusinessListProp {
  list?: Array<IBusiness>;
}

export const BusinessList = ({ list }: BusinessListProp) => {
  const [context, dispatch] = useAppContext();

  const handleChange = (businessId: string) =>
    dispatch({
      action: "SET_BUSINESS",
      payload: { business: list?.filter((b) => b._id === businessId)[0] },
    });
  const handleAdd = () => {
    dispatch({
      action: "OPEN_POPUP",
      payload: {
        popupChild: <BusinessAdd />,
      },
    });
  };

  return (
    <Stack direction="row" flexWrap="wrap">
      <FormControl sx={{ m: 1, minWidth: 120 }} required>
        <InputLabel id="business-select-label">Business</InputLabel>
        <Select
          labelId="business-select-label"
          id="business-select"
          value={context.business?._id}
          label="Business"
          onChange={(e) => handleChange(e.target.value)}
          renderValue={() => (
            <>
              {!!context.business && (
                <>
                  <Typography variant="body1">
                    {context.business.name}
                  </Typography>
                </>
              )}
            </>
          )}
        >
          {list?.map((business) => (
            <MenuItem
              sx={{ display: "flex", flexDirection: "column" }}
              key={`${business._id ?? ""}-menu name`}
              value={business._id}
            >
              <Typography variant="body1">{business.name}</Typography>
              <Typography variant="caption">{business.contact}</Typography>
              <Typography variant="caption">{business.email}</Typography>
            </MenuItem>
          ))}
          <Button fullWidth onClick={handleAdd}>
            <Add /> "Add IBusiness"
          </Button>
        </Select>
      </FormControl>

      {context.business && <BranchList />}
    </Stack>
  );
};

export const BusinessView = () => {
  const business = useLocation().state as IBusiness;

  return (
    <>
      <Stack direction="row" flexWrap="wrap" spacing={2}>
        <Stack padding={4}>
          <Typography variant="h5">{business.name}</Typography>
          <Typography variant="subtitle1">{business.contact}</Typography>
          <Typography variant="subtitle1">{business.email}</Typography>
          <Typography variant="subtitle1">{business.licence}</Typography>
        </Stack>
        <BranchList />
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
  const [context, contextDispatch] = useAppContext();
  const [business, dispatch] = React.useReducer(
    businessReducer,
    {
      founder: context.user?.person?._id
    }
  );

  const handleSaveButtonClick = () => {
    dispatch({ payload: { founder: context.user?.person?._id } })
    console.info(context.user?.person?._id)
    Business.add(context.user?._id ?? "", business)
      .then(() => contextDispatch({ action: "CLOSE_POPUP" }))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Stack spacing={2} margin={2}>
        <FormControl required >
          <TextField
            label="Name*"
            onChange={(e) => {
              dispatch({ payload: { name: e.target.value } });
            }}
            value={business.name}
          />
        </FormControl>
        <FormControl required>
          <TextField
            label="Contact"
            onChange={(e) => {
              dispatch({ payload: { contact: e.target.value } });
            }}
            value={business.contact}
          />
        </FormControl>
        <FormControl required>
          <TextField
            type="email"
            label="Email*"
            onChange={(e) => {
              dispatch({ payload: { email: e.target.value } });
            }}
            value={business.email}
          />
        </FormControl>
        <FormControl required>
          <TextField
            label="Licence"
            onChange={(e) => {
              dispatch({ payload: { licence: e.target.value } });
            }}
            value={business.licence}
          />
        </FormControl>
        <FormControl required>
          <TextField
            label="Location"
            onChange={(e) => {
              dispatch({ payload: { location: e.target.value } });
            }}
            value={business.location}
          />
        </FormControl>
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
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        margin={2}
      >
        <Outlet />
      </Stack>
    </>
  );
};
