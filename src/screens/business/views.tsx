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
import { Business, IBusiness } from "../../shared/models/business";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Add, BusinessOutlined, Save } from "@mui/icons-material";
import { BranchSelector } from "../branch";
import useAppContext from "../../shared/hooks/app-context";
import { User } from "../../shared/models/user";
import { useState, useEffect } from "react";
import { IBranch } from "../../shared/models/branch";
import { IEmployee } from "../../shared/models/employee";

export const BusinessList = () => {
  const [context, dispatch] = useAppContext();
  const user = User.getInstance();
  const jobs = user?.jobs;
  const [list, setList] = useState<IBusiness[]>([]);
  const [branches, setBranches] = useState<IBranch[]>([])

  useEffect(() => {
    const bus =
      jobs
        ?.filter((j) => !!j.branch?.business)
        .map((j) => j.branch!.business!) ?? [];

    const uniqueData: IBusiness[] = Array.from(
      new Set(bus.map((obj) => obj.email))
    ).map((email) => {
      return bus.find((obj) => obj.email === email)!;
    });

    setList(uniqueData);
  }, [jobs]);

  useEffect(() => {
    const b: IBranch[] | undefined = jobs?.filter(j => j.branch?.business?._id === context.business?._id).map(j => j.branch ?? {})
    setBranches(b ?? [])
  }, [context.business])

  const onBranchAddSuccess = (job: IEmployee) => {
    setBranches(prev => {
      const b: IBranch[] = prev.map(branch => (branch._id === job.branch?._id) ? (job.branch ?? {}) : branch)
      if (job.branch) {
        const index = prev.indexOf(job.branch)
        if (index < 0) {
          b.push(job.branch)
        }
      }
      return b;
    })
  }

  const handleChange = (businessId: string) => {
    dispatch({
      action: "SET_BUSINESS",
      payload: { business: list?.filter((b) => b?._id === businessId)[0] },
    });
    // dispatch({
    //   action: "SET_BRANCH",
    //   payload: { branch: (branches.length > 0) ? (branches[0]) : (undefined) },
    // });
  }

  const handleDelete = (business?: IBusiness) => {
    const confirmation = prompt(
      `Do You Want To Delete ${business?.name ?? ""} business?(yes/no)`,
      "No"
    );
    switch (confirmation?.toLocaleLowerCase()) {
      case "yes":
        !!business &&
          Business.delete(business._id ?? "")
            .then((value) => {
              User.removeJob((j) => j.branch?.business?._id !== value._id);
            })
            .catch((error) => console.error(error));
        break;
      default:
        console.info("good choice");
    }
  };

  const handleEdit = (business?: IBusiness) => {
    dispatch({
      action: "OPEN_POPUP",
      payload: {
        popupChild: (
          <BusinessAdd business={business} onSuccess={onAddSuccess} />
        ),
      },
    });
  };
  const onAddSuccess = (business: IBusiness) => {
    setList((prev) => {
      const newState = prev.map((b) => (b._id === business._id ? business : b));
      const index = newState.indexOf(business);
      if (index < 0) {
        newState.push(business);
      }
      return newState;
    });
  };

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
          renderValue={() => (<> <BusinessOutlined /> {" "}{context.business?.name}</>)}
        >
          {list?.map((business) => (
            <MenuItem
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
              }}
              dense={true}
              divider={true}
              key={`${business?._id ?? ""}-menu name`}
              value={business?._id}
            >
              <ListItemIcon
                key={`${business?._id ?? ""}-menu listItemIcon`}
              // onClick={() => handleEdit(business)}
              >
                <BusinessOutlined color="primary" />
                {/* <EditOutlined
                  key={`${business?._id ?? ""}-menu listItemIcon edit`}
                  color="primary"
                /> */}
              </ListItemIcon>
              <ListItemText
                sx={{ flexGrow: 1, whiteSpace: "pre-line" }}
                key={`${business?._id ?? ""}-menu name-text`}
                primary={business?.name}
                secondary={
                  (business.email ? business.email.concat("\n") : "") +
                  (business.contact ? business.contact : "")
                }
              />
            </MenuItem>
          ))}
          <MenuItem
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
            }}
            dense={true}
            divider={true}
            value={context.business?._id}
            onClick={handleAdd}
          >
            <Add /> "Add IBusiness"
          </MenuItem>
        </Select>
      </FormControl>

      {context.business && <BranchSelector branches={branches} onAddSuccess={onBranchAddSuccess} />}
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
      </Stack>
    </>
  );
};

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
