import { useEffect, useState } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { useLocation, useRoutes } from "react-router-dom";
import { useGetAuth } from "../../contexts/AuthContext";
import { collectionReferences } from "../../db/constants/collectionReferences";
import { useActions } from "../../hooks/useActions";
import { actions, useSelector } from "../../store";
import { FirestoreTypesHideHeaderPaths } from "../../types/db/firestoreTypesHideHeaderPaths";
import { routes } from "../routes";

export const useRoutesWrapper = (): typeof result => {
  useGetAuth();
  const { addHeaderHidePaths } = useActions(actions);
  const userId = useSelector((s) => s.user.id);
  const hideHeaderPaths = useSelector((s) => s.configurations.hideHeaderPaths);
  const routingList = useRoutes(routes(!!userId));
  const location = useLocation();
  const [shouldShowHeader, setShouldShowHeader] = useState(false);
  const [hideHeaderPathsDocs] =
    useCollectionDataOnce<FirestoreTypesHideHeaderPaths>(
      collectionReferences.hideHeaderPaths
    );

  useEffect(() => {
    if (typeof hideHeaderPathsDocs === "undefined") return;
    const dataList = hideHeaderPathsDocs.map((d) => d.name);
    addHeaderHidePaths(dataList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideHeaderPathsDocs]);

  // const navigate = useNavigate();

  useEffect(() => {
    // if (!!userId) {
    //   navigate("/");
    // }
    // 無限ループが発生するので
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hideHeaderPaths.includes(location.pathname)) {
      setShouldShowHeader(true);
    } else {
      setShouldShowHeader(false);
    }
  }, [location.pathname, hideHeaderPaths]);

  const result = {
    routingList,
    shouldShowHeader,
  };
  return result;
};
