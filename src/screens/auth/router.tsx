import { Route, Routes } from "react-router-dom";
import { AuthScreen, Login, Signup } from "./";
import useAppContext from "../../shared/hooks/app-context";
import { IUser } from "../../shared/models/user";
import { ClientUrls } from "../../shared/routes";

export const AuthRoutes = () => {
  const [context, dispatch] = useAppContext();

  const handleSignup: (user: IUser | undefined) => undefined = (user: IUser | undefined) => {
    !!context.navigate && context.navigate(ClientUrls.auth.login);
  };

  return (
    <Routes>
      <Route path="/" element={<AuthScreen />}>
        <Route index element={<Login />} />
        <Route path={ClientUrls.auth.login} element={<Login />} />
        <Route
          path={ClientUrls.auth.signup}
          element={<Signup onSuccess={handleSignup} />}
        />
      </Route>
    </Routes>
  );
};
