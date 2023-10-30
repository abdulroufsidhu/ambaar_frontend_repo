import { Save } from "@mui/icons-material";
import { Stack, TextField, Button } from "@mui/material";
import { useReducer } from "react";
import useAppContext from "../../shared/hooks/app-context";
import { IBranch, Branch } from "../../shared/models/branch";
import { User } from "../../shared/models/user";

interface BranchAddProps {
  branch?: IBranch;
  onSuccess?: (branch: IBranch) => void;
}

const branchReducer = (state: IBranch, action: { payload?: IBranch }) => {
  if (action.payload) {
    return { ...state, ...action.payload };
  }
  return state;
};

export const BranchAdd = ({
  branch: paramBranch,
  onSuccess,
}: BranchAddProps) => {
  const [context, contextDispatch] = useAppContext();
  if (!context.business) {
    contextDispatch({ action: "CLOSE_POPUP" });
  }
  const [branch, dispatch] = useReducer(
    branchReducer,
    paramBranch ?? { business: context.business }
  );

  const handleSave = () => {
    if (!paramBranch) {
      Branch.add(branch)
        .then((job) => {
          if (job) {
            User.addJob(job);
            !!onSuccess && onSuccess(job);
            contextDispatch({ action: "CLOSE_POPUP" });
          }
        })
        .catch((error) => console.error(error));
    } else {
      Branch.update(branch)
        .then(() => {
          const j = User.getInstance().jobs?.filter(
            (j) => j.branch?._id === branch._id
          );
          if (!!j && j.length > 0) {
            const fj = { ...j[0], branch };
            User.updateJob(fj);
            !!onSuccess && onSuccess(fj);
            contextDispatch({ action: "CLOSE_POPUP" });
          }
        })
        .catch((error) => console.error(error));
    }
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
