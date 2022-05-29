import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { configurationActions } from "../../configurations/slice";

export const useFetchConfigs = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(configurationActions.fetchConfigurations());
  }, [dispatch]);
};
