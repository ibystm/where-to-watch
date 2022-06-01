import { useDispatch } from "react-redux";
import { actions } from "../../../store";

export const useResetContents = () => {
  const dispatch = useDispatch();
  const { resetDiscovers, resetPopularities } = actions;

  const resetContents = (): void => {
    dispatch(resetDiscovers());
    dispatch(resetPopularities());
  };

  return {
    resetContents,
  };
};
