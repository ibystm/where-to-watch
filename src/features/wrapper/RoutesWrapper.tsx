import React from "react";
import { GlobalTop } from "../global-top";
import { useRoutesWrapper } from "./useRoutesWrapper";

export const RoutesWrapper: React.FC = () => {
  const { routingList, shouldShowHeader } = useRoutesWrapper();
  return (
    <GlobalTop shouldShowheader={shouldShowHeader}>{routingList}</GlobalTop>
  );
};
