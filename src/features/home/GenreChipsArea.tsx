import { ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { commonDictionaries } from "../../commons/constants/dictionaries";
import { useSelector } from "../../store/store";
import { ModeType } from "../../types/redux/contentsMode";
import { Genre } from "../../types/redux/genres";
import { modeIndexSelector } from "../global/header/selectors/contentsMode";
import { GenreChip } from "./GenreChip";
import {
  movieGenresSelector,
  tvGenresSelector,
} from "./slice/genres/selectors";

export const GenreChipsArea: React.FC = () => {
  const modeIndex = useSelector(modeIndexSelector);
  const movieGenres = useSelector(movieGenresSelector.selectAll);
  const tvGenres = useSelector(tvGenresSelector.selectAll);
  const genres = modeIndex === ModeType.Movie ? movieGenres : tvGenres;

  const popular: Genre = {
    id: 0,
    name: commonDictionaries.popular,
  };
  const displayGenres = [popular, ...genres];

  return displayGenres.length > 0 ? (
    <Flex w="100%" justify="space-around" alignItems="center" padding="4">
      <Flex overflowX="hidden" gap="4">
        {displayGenres.map((item) => (
          <GenreChip key={item.id} genre={item} />
        ))}
      </Flex>
      <IconButton
        marginLeft="4"
        aria-label="next-content"
        icon={<ChevronRightIcon />}
        fontSize="2xl"
      />
    </Flex>
  ) : null;
};
