import { Navigate, RouteObject } from "react-router-dom";
import { Credits } from "./credits";
import { Home } from "./home";
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
    path: "/credits",
    element: <Credits />,
  },
  {
    path: "/*",
    element: isSignIn ? <Navigate to="/" /> : <Navigate to="signin" />,
  },
];
