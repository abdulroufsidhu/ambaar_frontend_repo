import {
  Button,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import { Business, IBusiness } from "../../shared/models/business";
import React from "react";
import { Save } from "@mui/icons-material";
import useAppContext from "../../shared/hooks/app-context";
import { User } from "../../shared/models/user";
interface BusinessAddProps {
  business?: IBusiness;
  onSuccess?: (business: IBusiness) => void;
}

const businessReducer = (state: IBusiness, action: { payload?: IBusiness }) => {
  if (action.payload) {
    return { ...state, ...action.payload };
  }
  return state;
};

export const BusinessAdd = ({ business, onSuccess }: BusinessAddProps) => {
  const [_, contextDispatch] = useAppContext();
  const user = User.getInstance();
  const [newBusiness, dispatch] = React.useReducer(
    businessReducer,
    business ?? {
      founder: user?.person?._id,
    }
  );

  const handleSaveButtonClick = () => {
    console.info(user?.person?._id);
    if (!business) {
      Business.add(user?._id ?? "", newBusiness)
        .then((job) => {
          !!job && User.addJob(job);
          contextDispatch({ action: "CLOSE_POPUP" });
          !!job && !!onSuccess && onSuccess(job);
        })
        .catch((error) => console.error(error));
    } else {
      Business.update(newBusiness)
        .then(() => {
          const j = User.getInstance().jobs?.filter(
            (paramJ) => paramJ.branch?.business?._id === newBusiness._id
          );
          if (j && j.length > 0) {
            User.updateJob({
              ...j[0],
              branch: {
                ...j[0].branch,
                business: { ...newBusiness },
              },
            });
          }
          contextDispatch({ action: "CLOSE_POPUP" });
          !!onSuccess && onSuccess(newBusiness);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <Stack spacing={2} margin={2}>
        <FormControl required>
          <TextField
            label="Name*"
            onChange={(e) => {
              dispatch({ payload: { name: e.target.value } });
            }}
            value={newBusiness.name}
          />
        </FormControl>
        <FormControl required>
          <TextField
            label="Contact"
            onChange={(e) => {
              dispatch({ payload: { contact: e.target.value } });
            }}
            value={newBusiness.contact}
          />
        </FormControl>
        <FormControl required>
          <TextField
            type="email"
            label="Email*"
            onChange={(e) => {
              dispatch({ payload: { email: e.target.value } });
            }}
            value={newBusiness.email}
          />
        </FormControl>
        <FormControl required>
          <TextField
            label="Licence"
            onChange={(e) => {
              dispatch({ payload: { licence: e.target.value } });
            }}
            value={newBusiness.licence}
          />
        </FormControl>
        <FormControl required>
          <TextField
            label="Location"
            onChange={(e) => {
              dispatch({ payload: { location: e.target.value } });
            }}
            value={newBusiness.location}
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