import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { useRef } from "react";
import { GenreChip } from "./GenreChip";
import { useGenreChipsArea } from "./hooks/useGenreChipsArea";
import { useResizeObserver } from "./useResizeObserver";

export const GenreChipsArea: React.FC = () => {
  const genreChipAreaRef = useRef<HTMLDivElement>(null);
  const {
    displayGenres,
    shouldShowPreviousButton,
    shouldShowNextButton,
    handleResize,
    handleScroll,
  } = useGenreChipsArea(genreChipAreaRef.current);
  useResizeObserver([genreChipAreaRef], handleResize);

  return displayGenres.length > 0 ? (
    <Flex w="100%" justify="space-around" alignItems="center" padding="4">
      {shouldShowPreviousButton && (
        <IconButton
          marginLeft="4"
          aria-label="next-content"
          icon={<ChevronLeftIcon />}
          fontSize="2xl"
          onClick={() => handleScroll("previous")}
        />
      )}
      <Flex overflowX="hidden" gap="4" ref={genreChipAreaRef}>
        {displayGenres.map((item) => {
          return <GenreChip key={item.id} genre={item} />;
        })}
      </Flex>
      {shouldShowNextButton && (
        <IconButton
          // marginLeft="4"
          aria-label="next-content"
          icon={<ChevronRightIcon />}
          fontSize="2xl"
          onClick={() => handleScroll("next")}
        />
      )}
    </Flex>
  ) : null;
};
