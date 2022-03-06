import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { loadingActions } from "../../loading/slice/loading";
import { contentsActions } from "../slice/contents";

export const useFetchContents = () => {
  const dispatch: AppDispatch = useDispatch();
  const fetchContents = async () => {
    dispatch(loadingActions.startLoading());
    // ==========  API Call ==========
    dispatch(contentsActions.fetchDiscoverMovies());
    // ==========  end API Call ==========
    dispatch(loadingActions.endLoading());
  };

  React.useEffect(() => {
    fetchContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
