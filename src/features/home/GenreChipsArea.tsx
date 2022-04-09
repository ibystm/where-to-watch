import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton } from "@chakra-ui/react";
import { useSelector } from "../../store/store";

export const GenreChipsArea: React.VFC = () => {
  const genres = useSelector((state) => state.genres.movie);
  return (
    <Flex w="100%" justify="space-around" alignItems="center" padding="4">
      <Flex overflowX="hidden" gap="4">
        {genres.map((item, idx) => (
          <Button
            marginY="2"
            key={idx}
            height="12"
            // w="100px"
            variant="outline"
            borderRadius="20px"
            padding="8px 16px"
            width="fit-content"
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
  );
};
