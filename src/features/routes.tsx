import { Navigate, RouteObject } from "react-router-dom";
import { Home } from "./home/Home";
import { SignUp } from "./sign-up/SignUp";

export const routes = (isSignIn: boolean): RouteObject[] => [
  {
    path: "/",
    element: !isSignIn ? <Navigate to="/signin" /> : <Home />,
  },
  {
    path: "/signin",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/*",
    element: isSignIn ? <Navigate to="/" /> : <Navigate to="signin" />,
  },
];
