import { Navigate, RouteObject } from "react-router-dom";
import { About } from "./about";
import { AccountInfo } from "./account-info";
import { Credits } from "./credits";
import { Home } from "./home";
import { SiginIn } from "./sign-in";
import { SignUp } from "./sign-up";

export const routes = (isSignIn: boolean): RouteObject[] => [
  {
    path: "/",
    element: !isSignIn ? <Home /> : <Home />,
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
    path: "/credits",
    element: <Credits />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/account",
    element: <AccountInfo />,
  },
  {
    path: "/*",
    element: isSignIn ? <Navigate to="/" /> : <Navigate to="signin" />,
  },
];
