import { useEffect, useState } from "react";
import { commonDictionaries } from "../../../commons/constants/dictionaries";
import { useSelector } from "../../../store/store";
import { ModeType } from "../../../types/redux/contentsMode";
import { Genre } from "../../../types/redux/genres";
import {
  movieGenresSelector,
  tvGenresSelector,
} from "../slice/genres/selectors";

const popular: Genre = {
  id: 0,
  name: commonDictionaries.popular,
};

const SCROLL_WIDTH = 240;

export const useGenreChipsArea = (
  genreChipAreaRef: HTMLDivElement | null
): typeof res => {
  const modeIndex = useSelector((s) => s.contentsMode.modeIndex);
  const movieGenres = useSelector(movieGenresSelector.selectAll);
  const tvGenres = useSelector(tvGenresSelector.selectAll);
  const genres = modeIndex === ModeType.Movie ? movieGenres : tvGenres;
  const displayGenres = [popular, ...genres];
  const [shouldShowPreviousButton, setShouldShowPreviousButton] =
    useState(false);
  const [shouldShowNextButton, setShouldShowButton] = useState(true);
  const [genreChipAreaWidth, setGenreChipAreaWidth] = useState(0);
  const handleResize = (entries: ResizeObserverEntry[]) => {
    const width = entries[0].contentRect.width;
    setGenreChipAreaWidth(width);
  };
  const handleScroll = (condition: "previous" | "next"): void => {
    if (genreChipAreaRef === null) return;

    genreChipAreaRef.scrollTo({
      left:
        condition === "previous"
          ? genreChipAreaRef.scrollLeft - SCROLL_WIDTH
          : genreChipAreaRef.scrollLeft + SCROLL_WIDTH,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (genreChipAreaRef === null) return;
    // TODO: 要調査
    // 1ミリでもscroll eventが走るたびにstateの更新をしてしまうので、別の方法を模索したい
    genreChipAreaRef.addEventListener("scroll", () => {
      const currentAreaElement = genreChipAreaRef;
      if (currentAreaElement === null) return;

      if (
        // scrollが最後まで行ったとき
        genreChipAreaWidth + currentAreaElement.scrollLeft + 56 >=
        currentAreaElement.scrollWidth
      ) {
        setShouldShowButton(false);
      } else {
        setShouldShowButton(true);
      }
      console.log(`genreChipAreaWidth: ${genreChipAreaWidth}`);
      console.log(
        `currentAreaElement.scrollLeft: ${currentAreaElement.scrollLeft}`
      );
      console.log(`element.scrollWidth: ${currentAreaElement.scrollWidth}`);

      if (currentAreaElement.scrollLeft === 0) {
        setShouldShowPreviousButton(false);
      } else {
        setShouldShowPreviousButton(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreChipAreaRef, genreChipAreaWidth]);

  const res = {
    displayGenres,
    shouldShowNextButton,
    shouldShowPreviousButton,
    handleResize,
    handleScroll,
  };

  return res;
};
