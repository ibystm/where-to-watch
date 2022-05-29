import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { useGetAuth } from "../../contexts/AuthContext";
import { useSelector } from "../../store";
import { userSelectors } from "../../store/selectors/users";
import { GlobalTop } from "../global-top";
import { routes } from "../routes";

export const RoutesWrapper: React.FC = () => {
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
