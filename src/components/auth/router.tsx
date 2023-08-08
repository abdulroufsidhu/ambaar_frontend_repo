import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import AuthScreen from "./screen";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthScreen />}>
        <Route index element={<Login />} />
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.SIGNUP} element={<Signup />} />
      </Route>
    </Routes>
  );
};

export const routes = {
  LOGIN: "/login",
  SIGNUP: "/signup",
};
