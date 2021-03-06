import { Navigate, RouteObject } from "react-router-dom";
import { About } from "./about";
import { Credits } from "./credits";
import { Home } from "./home";
import { SignUp } from "./sign-up/SignUp";

export const routes = (isSignIn: boolean): RouteObject[] => [
  {
    path: "/",
    element: !isSignIn ? <Home /> : <Home />,
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
    path: "/about",
    element: <About />,
  },
  {
    path: "/*",
    element: isSignIn ? <Navigate to="/" /> : <Navigate to="signin" />,
  },
];
