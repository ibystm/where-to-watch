import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions, AppDispatch } from "../../../store";

export const useFetchConfigs = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchConfigurations());
  }, [dispatch]);
};
