import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { useGetAuth } from "../../contexts/AuthContext";
import { userSelectors } from "../../store/selectors/users";
import { useSelector } from "../../store/store";
import { GlobalTop } from "../global/GlobalTop";
import { routes } from "../routes";

export const RoutesWrapper: React.VFC = () => {
  useGetAuth();
  const userId = useSelector(userSelectors.id);
  const navigate = useNavigate();
  const routing = useRoutes(routes(!!userId));

  useEffect(() => {
    if (!!userId) {
      navigate("/");
    }
    // 無限ループが発生するので
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <GlobalTop>{routing}</GlobalTop>;
};
