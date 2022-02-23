import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { contentsActions } from "../slice/contents";

export const useFetchContents = () => {
  const dispatch: AppDispatch = useDispatch();
  const fetchContents = () => {
    dispatch(contentsActions.fetchDiscoverMovies());
  };

  React.useEffect(() => {
    fetchContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
