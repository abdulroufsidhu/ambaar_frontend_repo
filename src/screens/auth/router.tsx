import { Route, Routes } from "react-router-dom";
import { AuthScreen, Login, Signup } from "./";
import useAppContext from "../../shared/hooks/app-context";
import { IUser } from "../../shared/models/user";

export const AuthRoutes = () => {
  const [context, dispatch] = useAppContext();

  const handleSignup: (user: IUser) => undefined = (user: IUser) => {
    dispatch({ action: "SET_USER", payload: { user } });
    !!context.navigate && context.navigate("/items");
  };

  return (
    <Routes>
      <Route path="/" element={<AuthScreen />}>
        <Route index element={<Login />} />
        <Route path={routes.LOGIN} element={<Login />} />
        <Route
          path={routes.SIGNUP}
          element={<Signup onSuccess={handleSignup} />}
        />
      </Route>
    </Routes>
  );
};

export const routes = {
  LOGIN: "login/",
  SIGNUP: "signup/",
};
