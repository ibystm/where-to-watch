import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { useGetAuth } from "../../contexts/AuthContext";
import { selectUser } from "../../store/slices/usersSlice";
import { useSelector } from "../../store/store";
import { GlobalTop } from "../global/GlobalTop";
import { routes } from "../routes";

export const RoutesWrapper: React.VFC = () => {
  useGetAuth();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const routing = useRoutes(routes(!!user.id));

  useEffect(() => {
    if (!!user) {
      navigate("/");
    }
    // 無限ループが発生するので
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <GlobalTop>{routing}</GlobalTop>;
};
