import React from "react";
import { useSelector } from "../../store";
import { GlobalTop } from "../global-top";
import { Spinner } from "../loading";
import { useRoutesWrapper } from "./useRoutesWrapper";

export const RoutesWrapper: React.FC = () => {
  const { routingList, shouldShowHeader } = useRoutesWrapper();
  const isLoading = useSelector((s) => s.loading.isLoading);
  return (
    <>
      {isLoading && <Spinner masked />}
      <GlobalTop shouldShowheader={shouldShowHeader}>{routingList}</GlobalTop>
    </>
  );
};
