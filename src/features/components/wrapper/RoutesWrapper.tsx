import React, { useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { routes } from "../../routes";

export const RoutesWrapper: React.VFC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("user!!!", currentUser);
  const routing = useRoutes(routes(!!currentUser));
  console.log("location.pathname", location.pathname);

  useEffect(() => {
    if (!!currentUser) {
      navigate("/");
    }
  }, [currentUser, location.pathname, navigate]);

  return <>{routing}</>;
};
