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

export const useGenreChipsArea = (
  genreChipAreaRef: HTMLDivElement | null
): typeof res => {
  const modeIndex = useSelector((s) => s.contentsMode.modeIndex);
  const movieGenres = useSelector(movieGenresSelector.selectAll);
  const tvGenres = useSelector(tvGenresSelector.selectAll);
  const genres = modeIndex === ModeType.Movie ? movieGenres : tvGenres;
  const displayGenres = [popular, ...genres];
  const [shouldShowNextButton, setShouldShowButton] = useState(true);
  const [genreChipAreaWidth, setGenreChipAreaWidth] = useState(0);
  const handleResize = (entries: ResizeObserverEntry[]) => {
    const width = entries[0].contentRect.width;
    setGenreChipAreaWidth(width);
  };
  const scrollNext = (): void => {
    if (genreChipAreaRef === null) return;
    genreChipAreaRef.scrollTo({
      left: genreChipAreaRef.scrollLeft + 200,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (genreChipAreaRef === null) return;
    genreChipAreaRef.addEventListener("scroll", () => {
      const currentAreaElement = genreChipAreaRef;
      if (currentAreaElement === null) return;

      if (
        // scrollが最後まで行ったとき
        genreChipAreaWidth + currentAreaElement.scrollLeft >=
        currentAreaElement.scrollWidth
      ) {
        setShouldShowButton(false);
      } else {
        setShouldShowButton(true);
      }
    });
  }, [genreChipAreaRef, genreChipAreaWidth]);

  const res = {
    displayGenres,
    shouldShowNextButton,
    handleResize,
    scrollNext,
  };

  return res;
};
