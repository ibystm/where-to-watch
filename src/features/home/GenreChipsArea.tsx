import { ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useRef } from "react";
import { GenreChip } from "./GenreChip";
import { useGenreChipsArea } from "./hooks/useGenreChipsArea";

export const GenreChipsArea: React.FC = () => {
  const displayGenres = useGenreChipsArea();
  const ref = useRef<HTMLDivElement>(null);

  return displayGenres.length > 0 ? (
    <Flex w="100%" justify="space-around" alignItems="center" padding="4">
      <Flex overflowX="hidden" gap="4" ref={ref}>
        {displayGenres.map((item, idx) => (
          <GenreChip key={item.id} genre={item} />
        ))}
      </Flex>

      <IconButton
        marginLeft="4"
        aria-label="next-content"
        icon={<ChevronRightIcon />}
        fontSize="2xl"
        onClick={() => {
          if (ref.current === null) return;
          // scrollの量を取得して、maxの時はright arrowは隠すように修正
          console.log(`left: ${ref.current.scrollLeft}`);
          ref.current.scrollLeft += 200;
        }}
      />
    </Flex>
  ) : null;
};
