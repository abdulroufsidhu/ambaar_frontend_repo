import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Branch, IBranch } from "../../shared/models/branch";
import { Add, Save, VisibilityOutlined } from "@mui/icons-material";
import { MyFab } from "../../shared/components/fab";
import { useEffect, useReducer, useState } from "react";
import { IBusiness } from "../../shared/models/business";

interface BranchListProp {
  business: IBusiness;
}

export const BranchList = ({ business }: BranchListProp) => {
  const [branches, setBranches] = useState<Array<IBranch>>(() => []);
  const [addBranchModalVisibility, setAddBranchModalVisibility] =
    useState(false);
  const [inViewBranch, setInViewBranch] = useState<IBranch | undefined>(
    undefined
  );

  useEffect(() => {
    Branch.list(business._id ?? "")
      .then((list) => {
        console.info(list);
        list && setBranches(list);
      })
      .catch((error) => console.error(error));
    return () => setBranches([]);
  }, []);

  const handleAddBranchButtonClick: () => undefined = () => {
    setAddBranchModalVisibility(true);
    console.info(addBranchModalVisibility);
  };

  const handleViewBranchButtonClick: (branch: IBranch) => undefined = (
    branch
  ) => {
    setInViewBranch(branch);
  };

  console.info(branches);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", padding: 0, margin: 0 }}
    >
      <List>
        {branches?.map((branch) => {
          return (
            <>
              <ListItem
                key={`${branch.name ?? ""}-${branch.email ?? ""}-list-item`}
                sx={{ marginBlock: 2 }}
              >
                <ListItemText
                  key={`${branch.name ?? ""}-${branch.email ?? ""}`}
                  primary={branch.name}
                  secondary={`${branch.location ?? ""} - ${branch.email ?? ""}`}
                />
                <ListItemSecondaryAction
                  key={`${branch.name ?? ""}-${
                    branch.email ?? ""
                  }-list-item-secondary-action`}
                >
                  <IconButton
                    key={`${branch.name ?? ""}-${
                      branch.email ?? ""
                    }-list-item-secondary-action-icon-button`}
                    onClick={() => {
                      handleViewBranchButtonClick(branch);
                    }}
                  >
                    <VisibilityOutlined
                      key={`${branch.name ?? ""}-${
                        branch.email ?? ""
                      }-list-item-secondary-action-icon-button-icon`}
                    />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </>
          );
        })}
      </List>
      <MyFab
        label="Add Branch"
        startIcon={<Add />}
        onClick={handleAddBranchButtonClick}
      />
      <Popover
        open={addBranchModalVisibility}
        onClose={() => setAddBranchModalVisibility(false)}
        aria-labelledby="Add New Branch"
        aria-describedby="Add new branch in the selected business"
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          horizontal: "center",
          vertical: "center",
        }}
      >
        {!!business._id && <BranchAdd businessId={business._id} />}
      </Popover>
      <Popover
        open={!!inViewBranch}
        onClose={() => setInViewBranch(undefined)}
        aria-labelledby="View Branch"
        aria-describedby="View Selected Branch"
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          horizontal: "center",
          vertical: "center",
        }}
      >
        {!!inViewBranch && <BranchView branch={inViewBranch} />}
      </Popover>
    </Box>
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
