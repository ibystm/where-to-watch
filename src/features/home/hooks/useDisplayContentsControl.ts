import { useMemo } from "react";
import { RootState, useSelector } from "../../../store/store";
import { ModeType } from "../../../types/redux/contentsMode";
import { ActualContentData } from "../../../types/redux/discovers";

type useDisplayContentsControlReturnType = {
  results: {
    loading: boolean;
    data: ActualContentData[];
  };
};

export const useDisplayContentsControl =
  (): useDisplayContentsControlReturnType => {
    const modeIndex = useSelector((state) => state.contentsMode.modeIndex);
    const popularMovies = useSelector(
      (state: RootState) => state.popularities.movies
    );
    const popularTVs = useSelector((state) => state.popularities.tvs);

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
