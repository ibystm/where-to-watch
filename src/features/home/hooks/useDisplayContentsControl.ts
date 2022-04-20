import { useMemo } from "react";
import { useSelector } from "../../../store/store";
import { ModeType } from "../../../types/redux/contentsMode";
import { ActualContentData } from "../../../types/redux/discovers";
import {
  popularMovieSelector,
  popularTVsSelector,
} from "../selectors/popularities";

type useDisplayContentsControlReturnType = {
  results: {
    loading: boolean;
    data: ActualContentData[];
  };
};

export const useDisplayContentsControl =
  (): useDisplayContentsControlReturnType => {
    const modeIndex = useSelector((state) => state.contentsMode.modeIndex);
    const popularMovies = useSelector(popularMovieSelector.selectAll);
    const popularTVs = useSelector(popularTVsSelector.selectAll);

    const results = useMemo(
      () => ({
        loading: false,
        data: modeIndex === ModeType.Movie ? popularMovies : popularTVs,
      }),
      [modeIndex, popularMovies, popularTVs]
    );

    return {
      results,
    };
  };
