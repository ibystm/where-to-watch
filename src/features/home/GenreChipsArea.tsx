import { ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { GenreChip } from "./GenreChip";
import { useGenreChipsArea } from "./hooks/useGenreChipsArea";
import { useResizeObserver } from "./useResizeObserver";

export const GenreChipsArea: React.FC = () => {
  const displayGenres = useGenreChipsArea();
  const genreChipAreaRef = useRef<HTMLDivElement>(null);
  // const nextButtonRef = useRef<HTMLDivElement>(null);
  const [genreChipAreaWidth, setGenreChipAreaWidth] = useState(0);
  const handleResize = (entries: ResizeObserverEntry[]) => {
    const width = entries[0].contentRect.width;
    setGenreChipAreaWidth(width);
  };
  useResizeObserver([genreChipAreaRef], handleResize);

  return displayGenres.length > 0 ? (
    <Flex w="100%" justify="space-around" alignItems="center" padding="4">
      <Flex overflowX="hidden" gap="4" ref={genreChipAreaRef}>
        {displayGenres.map((item) => (
          <GenreChip key={item.id} genre={item} />
        ))}
      </Flex>

      <IconButton
        marginLeft="4"
        aria-label="next-content"
        icon={<ChevronRightIcon />}
        fontSize="2xl"
        onClick={() => {
          if (genreChipAreaRef.current === null) return;
          // scrollの量を取得して、maxの時はright arrowは隠すように修正
          genreChipAreaRef.current.scrollTo({
            left: genreChipAreaRef.current.scrollLeft + 200,
            behavior: "smooth",
          });

          // (overflowした)リストの最後のelementが画面状に見えているかどうかで、判定ができないかで判断
        }}
      />
    </Flex>
  ) : null;
};
