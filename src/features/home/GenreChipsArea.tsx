import { Button, Flex } from "@chakra-ui/react";
import { useSelector } from "../../store/store";

export const GenreChipsArea: React.VFC = () => {
  const genres = useSelector((state) => state.genres.movie);
  return (
    <Flex
      justify="space-around"
      alignItems="center"
      padding="4"
      overflow="hidden"
      gap="4"
    >
      {genres.map((item, idx) => (
        <Button
          key={idx}
          variant="outline"
          borderRadius="20px"
          padding="16px"
          width="fit-content"
        >
          {item.name}
        </Button>
      ))}
    </Flex>
  );
};
