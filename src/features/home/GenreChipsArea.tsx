import { ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { GenreChip } from "./GenreChip";
import { useGenreChipsArea } from "./hooks/useGenreChipsArea";
import {
  useInterSectionObserver,
  useResizeObserver,
} from "./useResizeObserver";

export const GenreChipsArea: React.FC = () => {
  const displayGenres = useGenreChipsArea();
  const genreChipAreaRef = useRef<HTMLDivElement>(null);
  const [genreChipAreaWidth, setGenreChipAreaWidth] = useState(0);
  const handleResize = (entries: ResizeObserverEntry[]) => {
    const width = entries[0].contentRect.width;
    setGenreChipAreaWidth(width);
  };

  useResizeObserver([genreChipAreaRef], handleResize);

  // const [shouldShowNextButton, setShouldShowButton] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const { isIntersecting } = useInterSectionObserver([ref]);

  const genreChipElements = displayGenres.map((item, idx) => {
    const isLastItem = idx === displayGenres.length - 1;

    return (
      <GenreChip
        key={item.id}
        genre={item}
        ref={isLastItem ? ref : undefined}
      />
    );
  });

  const scrollNext = (): void => {
    if (genreChipAreaRef.current === null) return;
    // scrollの量を取得して、maxの時はright arrowは隠すように修正
    genreChipAreaRef.current.scrollTo({
      left: genreChipAreaRef.current.scrollLeft + 200,
      behavior: "smooth",
    });

    // (overflowした)リストの最後のelementが画面状に見えているかどうかで、判定ができないかで判断
  };

  useEffect(() => {
    genreChipAreaRef.current &&
      genreChipAreaRef.current.addEventListener("scroll", () => {
        // ちゃんと理解は必要そうだけど、genreChipsAreaWidth + element.scrollLeft >= scrollWidthになった時に、
        // フラグを変えればよさそう！！！
        console.log({ scrollWidth: genreChipAreaRef.current?.scrollWidth });
        console.log({ scrollLeft: genreChipAreaRef.current?.scrollLeft });
      });
  }, []);
  console.log("genreChipAreaWidth:", genreChipAreaWidth);

  return displayGenres.length > 0 ? (
    <Flex
      w="100%"
      justify="space-around"
      alignItems="center"
      padding="4"
      backgroundColor="red"
    >
      <Flex overflowX="auto" gap="4" ref={genreChipAreaRef}>
        {genreChipElements}
      </Flex>

      <IconButton
        marginLeft="4"
        aria-label="next-content"
        icon={<ChevronRightIcon />}
        fontSize="2xl"
        onClick={scrollNext}
      />
    </Flex>
  ) : null;
};
