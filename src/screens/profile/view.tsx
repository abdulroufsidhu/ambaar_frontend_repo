import {
  Chip,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { User } from "../../shared/models/user";
import {
  ChevronRightRounded,
  CloseOutlined,
  EditAttributesOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { MyDataTable } from "../../shared/components/my-data-table";
import { IEmployee } from "../../shared/models/employee";
import { Business } from "../../shared/models/business";
import { useMemo } from "react";
import { ChangePassword } from "../auth";

interface IProfileJob {
  business: string;
  location: string;
  active: string;
}

export const ProfileView = () => {
  const [jobCollapseState, setJobCollapseState] = useState(false);
  const [editPasswordVisible, setEditPasswordVisible] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const profileJobs = useMemo(() => {
    return User.getInstance().jobs?.map((job) => {
      const retAble: IProfileJob = {
        business: job.branch?.business?.name ?? "unknown",
        location: job.branch?.location ?? "unknown",
        active: job.status ?? "inactive",
      };
      return retAble;
    });
  }, [User.getInstance()]);

  const handleJobCollapsableClick = () => {
    setJobCollapseState((prev) => !prev);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (number: number) => {
    setRowsPerPage(number);
    setPage(0);
  };

  const handleEditPasswordClick = () => {
    setEditPasswordVisible((prev) => !prev);
  };

  const handlePasswordSubmit = (old: string, newPassword: string, confNewPassword: string) => {
    return 
  }

  return (
    <Stack direction="column">
      <List>
        <ListItem>
          <ListItemText
            primary={`Name: ${User.getInstance().person?.name ?? "Un Named"}`}
            secondary={`eMail: ${
              User.getInstance().person?.email ?? "Un Known"
            }`}
          />
        </ListItem>
        <ListItem>
          <ListItemButton onClick={handleEditPasswordClick}>
            <ListItemIcon>
              {editPasswordVisible ? <CloseOutlined color="error" /> : <EditOutlined color="primary" />}
            </ListItemIcon>
            <ListItemText primary="Password" />
          </ListItemButton>
        </ListItem>
        {
          editPasswordVisible && <ChangePassword onSubmit={handlePasswordSubmit} />
        }
        <ListItemButton onClick={handleJobCollapsableClick}>
          <ListItemIcon>
            <ChevronRightRounded
              sx={{
                transform: `rotate(${jobCollapseState ? "90deg" : "0deg"})`,
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <>
                {" "}
                Total Jobs <Chip
                  label={User.getInstance().jobs?.length ?? 0}
                />{" "}
              </>
            }
          />
        </ListItemButton>
        <Collapse in={jobCollapseState} unmountOnExit>
          {profileJobs && (
            <MyDataTable<IProfileJob>
              data={profileJobs}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Collapse>
      </List>
    </Stack>
  );
};
