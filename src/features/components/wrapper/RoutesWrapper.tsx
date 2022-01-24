import React, { useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { useGetAuth } from "../../../contexts/AuthContext";
import { selectUser } from "../../../store/slices/usersSlice";
import { useSelector } from "../../../store/store";
import { routes } from "../../routes";

export const RoutesWrapper: React.VFC = () => {
  useGetAuth();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();
  const routing = useRoutes(routes(!!user));
  console.log("location.pathname", location.pathname);

  useEffect(() => {
    if (!!user) {
      navigate("/");
    }
  }, [location.pathname, navigate, user]);

  return <>{routing}</>;
};
