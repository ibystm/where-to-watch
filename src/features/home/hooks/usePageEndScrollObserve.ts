import throttle from "lodash.throttle";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions, useSelector } from "../../../store";

const INITIAL_PAGE = 1;

export const usePageEndScrollObserve = () => {
  const dispatch = useDispatch();
  const { selectedGenreId, modeIndex } = useSelector((s) => s.contentsMode);
  const [isFullyScrolled, setIsFullyScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const handleScroll = throttle(() => {
    // この判定が妥当かどうかは調べる必要があり
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.scrollHeight
    ) {
      return;
    }
    setCurrentPage((cur) => cur + 1);
    setIsFullyScrolled(true);
  }, 300);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetContents = (): void => {
    dispatch(actions.resetDiscovers());
    dispatch(actions.resetPopularities());
  };

  useEffect(() => {
    resetContents();
    setCurrentPage(INITIAL_PAGE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenreId, modeIndex]);

  const result = {
    isFullyScrolled,
    currentPage,
  };

  return result;
};
