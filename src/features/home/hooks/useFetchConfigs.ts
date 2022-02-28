import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { actions } from "../../configurations/slice/configurations";

export const useFetchConfigs = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchConfigs = () => {
      dispatch(actions.fetchConfigurations());
    };
    fetchConfigs();
  }, [dispatch]);
};
