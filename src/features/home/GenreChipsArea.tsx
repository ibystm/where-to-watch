import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton } from "@chakra-ui/react";
import { useSelector } from "../../store/store";
import { ModeType } from "../../types/redux/contentsMode";

export const GenreChipsArea: React.VFC = () => {
  const modeIndex = useSelector((state) => state.contentsMode.modeIndex);
  const movieGenres = useSelector((state) => state.genres.movie);
  const tvGenres = useSelector((state) => state.genres.tv);
  const genres = modeIndex === ModeType.Movie ? movieGenres : tvGenres;

  return genres.length > 0 ? (
    <Flex w="100%" justify="space-around" alignItems="center" padding="4">
      <Flex overflowX="hidden" gap="4">
        {genres.map((item, idx) => (
          <Button
            marginY="2"
            key={idx}
            height="12"
            variant="outline"
            borderRadius="20px"
            padding="8px 16px"
            flexShrink="0"
          >
            {item.name}
          </Button>
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
