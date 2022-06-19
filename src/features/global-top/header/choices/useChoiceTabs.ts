import { useDispatch } from "react-redux";
import { actions, useSelector } from "../../../../store";
import { ModeIndex } from "../../../../types/redux/contentsMode";

export const useChoiceTabs = () => {
  const dispatch = useDispatch();
  const modeIndex = useSelector((state) => state.contentsMode.modeIndex);
  const { changeMode, resetSelectedGenre } = actions;

  const handleChange = (index: number): void => {
    dispatch(changeMode(index as ModeIndex));
    dispatch(resetSelectedGenre());
  };

  const result = {
    modeIndex,
    handleChange,
  };
  return result;
};
