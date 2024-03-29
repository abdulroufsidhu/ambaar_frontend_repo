import {
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Business, IBusiness } from "../../shared/models/business";
import { Add, BusinessOutlined } from "@mui/icons-material";
import { BranchSelector } from "../branch";
import useAppContext from "../../shared/hooks/app-context";
import { User } from "../../shared/models/user";
import { useState, useEffect } from "react";
import { Branch, IBranch } from "../../shared/models/branch";
import { IEmployee } from "../../shared/models/employee";
import { BusinessAdd } from ".";
import { Typography } from "@mui/material";

export const BusinessSelector = () => {
  const [context, dispatch] = useAppContext();
  const user = User.getInstance();
  const jobs = user?.jobs;
  const [list, setList] = useState<IBusiness[]>([]);
  const [jobsUnderBusiness, setJobsUnderBusiness] = useState<IEmployee[]>([]);

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
    const j: IEmployee[] | undefined = jobs?.filter(
      (j) => j.branch?.business?._id === context.business?._id
    );
    setJobsUnderBusiness(j ?? []);
  }, [context.business]);

  const onBranchAddSuccess = (job: IEmployee) => {
    setJobsUnderBusiness((prev) => {
      const j: IEmployee[] = [...prev, job];
      Branch.setLoadedList(j);
      return j;
    });
  };

  const handleChange = (businessId: string) => {
    dispatch({
      action: "SET_BUSINESS",
      payload: { business: list?.filter((b) => b?._id === businessId)[0] },
    });
    // dispatch({
    //   action: "SET_BRANCH",
    //   payload: { branch: (branches.length > 0) ? (branches[0]) : (undefined) },
    // });
  };

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
      Business.setLoadedList(newState);
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
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
    >
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small" required>
        <InputLabel id="business-select-label">Business</InputLabel>
        <Select
          labelId="business-select-label"
          id="business-select"
          value={context.business?._id}
          label={"Business"}
          onChange={(e) => handleChange(e.target.value)}
          startAdornment={<BusinessOutlined />}
          renderValue={() => context.business?.name}
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

      {context.business && (
        <BranchSelector
          jobs={jobsUnderBusiness}
          onAddSuccess={onBranchAddSuccess}
        />
      )}
    </Stack>
  );
};
