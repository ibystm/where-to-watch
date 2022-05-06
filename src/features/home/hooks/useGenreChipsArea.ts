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

export const useGenreChipsArea = (): typeof displayGenres => {
  const modeIndex = useSelector((s) => s.contentsMode.modeIndex);
  const movieGenres = useSelector(movieGenresSelector.selectAll);
  const tvGenres = useSelector(tvGenresSelector.selectAll);

  const genres = modeIndex === ModeType.Movie ? movieGenres : tvGenres;

  const displayGenres = [popular, ...genres];
  return displayGenres;
};
