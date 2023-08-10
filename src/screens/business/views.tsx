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
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { routes } from "./router";
import { Add, Save } from "@mui/icons-material";
import { BranchList } from "../branch";

interface BusinessListProp {
  list?: Array<IBusiness>;
}

export const BusinessList = ({ list }: BusinessListProp) => {
  const navigate = useNavigate();
  const [activeBusiness, setActiveBusiness] = useState<IBusiness>()

  const handleChange = (businessId: string) => setActiveBusiness(list?.filter(b => b._id === businessId)[0])

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} required>
        <InputLabel id="business-select-label">Business</InputLabel>
        <Select
          labelId="business-select-label"
          id="business-select"
          value={activeBusiness?._id}
          label="Business"
          onChange={(e) => handleChange(e.target.value)}
          renderValue={() => (<>
            {
              (
                (!!activeBusiness) && (<>
                  <Typography variant="body1">
                    {activeBusiness.name}
                  </Typography>
                  <Typography variant="caption">
                    {activeBusiness.email}
                  </Typography>
                </>)
              )
            }
          </>)}
        >
          {list?.map(business => (<MenuItem sx={{ display: "flex", flexDirection: "column" }} key={`${business._id ?? ""}-menu name`} value={business._id}>
            <Typography variant="body1">
              {business.name}
            </Typography>
            <Typography variant="caption">
              {business.contact}
            </Typography>
            <Typography variant="caption">
              {business.email}
            </Typography>
          </MenuItem>))}
          <Button fullWidth onClick={() => {
            navigate(routes.ADD);
          }} >
            <Add /> "Add IBusiness"
          </Button>
        </Select>
      </FormControl>

      {(!!activeBusiness && <BranchList business={activeBusiness} />)}

    </>
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
        <BranchList business={business} />
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
      <Stack direction="row" flexWrap="wrap" justifyContent="center" alignItems="center" margin={2}>
        <Outlet />
      </Stack>
    </>
  );
};
