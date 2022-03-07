import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { contentsActions } from "../slice/contents";

export const useFetchContents = () => {
  const dispatch: AppDispatch = useDispatch();
  const fetchContents = useCallback(() => {
    dispatch(contentsActions.fetchDiscoverMovies());
  }, [dispatch]);

  React.useEffect(() => {
    fetchContents();
  }, [fetchContents]);
};
