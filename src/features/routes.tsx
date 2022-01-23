import { Navigate, RouteObject } from "react-router-dom";
import { Home } from "./components/home/Home";
import { SiginIn } from "./components/sign-in/SignIn";
import { SignUp } from "./components/sign-up/SignUp";

export const routes = (isSignIn: boolean): RouteObject[] => [
  {
    path: "/",
    element: !isSignIn ? <Navigate to="/signin" /> : <Home />,
  },

  {
    path: "/signin",
    element: <SiginIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: isSignIn ? <Navigate to="/" /> : <Navigate to="signin" />,
  },
];
