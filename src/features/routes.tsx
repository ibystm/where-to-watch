import { Navigate, RouteObject } from "react-router-dom";
import { About } from "./about";
import { Credits } from "./credits";
import { Home } from "./home";
import { SiginIn } from "./sign-in/SignIn";
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
    path: "/*",
    element: isSignIn ? <Navigate to="/" /> : <Navigate to="signin" />,
  },
];
