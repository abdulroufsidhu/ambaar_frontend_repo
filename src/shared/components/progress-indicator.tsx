import { useState } from "react";
import axios from "axios";
import { LinearProgress } from "@mui/material";

export const MyProgressIndicator = () => {
  const [loading, setLoading] = useState(false);

  axios.interceptors.request.use(
    (success) => {
      setLoading(true);
      return success;
    },
    (error) => {
      setLoading(false);
      console.error(error);
    }
  );
  axios.interceptors.response.use(
    (success) => {
      setLoading(false);
      return success;
    },
    (error) => {
      setLoading(false);
      console.error(error);
    }
  );
  if (loading) return <LinearProgress></LinearProgress>;
  return <></>;
};
