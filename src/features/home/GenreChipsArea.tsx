import { ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { GenreChip } from "./GenreChip";
import { useGenreChipsArea } from "./hooks/useGenreChipsArea";

export const GenreChipsArea: React.FC = () => {
  const displayGenres = useGenreChipsArea();

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
