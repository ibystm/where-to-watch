import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useRoutes } from "react-router-dom";
import { useGetAuth } from "../../contexts/AuthContext";
import { userSelectors } from "../../store/selectors/users";
import { routes } from "../routes";

const shouldHideheaderPathList = ["/credits", "/about"];

export const useRoutesWrapper = (): typeof result => {
  useGetAuth();
  const userId = useSelector(userSelectors.id);
  const routingList = useRoutes(routes(!!userId));
  const location = useLocation();
  const [shouldShowHeader, setShouldShowHeader] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    // if (!!userId) {
    //   navigate("/");
    // }
    // 無限ループが発生するので
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shouldHideheaderPathList.includes(location.pathname)) {
      setShouldShowHeader(false);
      return;
    }
    setShouldShowHeader(true);
  }, [location.pathname]);

  const result = {
    routingList,
    shouldShowHeader,
  };
  return result;
};
