import { Route, Routes } from "react-router-dom";
import { ProfileView } from "./view";

export const ProfileRoutes = () => {
  console.log("inside profile routes");
  return (
    <Routes>
      <Route index element={<ProfileView />} />
    </Routes>
  );
}
