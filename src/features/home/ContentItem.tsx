import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useSelector } from "../../store/store";
import { ActualContentData } from "../../types/redux/discovers";
import { configurationsSelector } from "../configurations/selectors/configurations";

type P = {
  contentItem: ActualContentData;
};

export const ContentItem: React.VFC<P> = ({ contentItem }) => {
  const { title, poster_path, releaseDate } = contentItem;
  const imageUrl = useSelector(configurationsSelector.secureImageUrl);
  const posterSizes = useSelector(configurationsSelector.posterSizes);
  const pathBuilder = (path: string): string | undefined => {
    if (!posterSizes || !imageUrl) return;
    const size = posterSizes.slice(-1)[0];

    return `${imageUrl}/${size}/${poster_path}`;
  };

  return (
    <Button
      height="296px"
      maxW="240px"
      variant="unstyled"
      borderRadius="20px"
      padding="8px 16px"
      backgroundColor="white"
      _focus={{ _focus: "none" }}
      _hover={{
        transition: "0.5s all",
        transform: "scale(1.3, 1.3)",
        zIndex: 10,
        boxShadow: "0.5px 0.5px 0.5px grey",
      }}
    >
      <Image
        marginX="auto"
        src={poster_path ? pathBuilder(poster_path) : undefined}
        alt={title ? title : "movie poster"}
        boxSize="85%"
        borderRadius="inherit"
        loading="lazy"
      />
      <Box w="100%" mt="4px">
        <Text
          fontSize="sm"
          fontWeight="bold"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          {title ? title : "タイトルなし"}
        </Text>
        <Text fontSize="sm">
          {releaseDate ? releaseDate : "リリース日不明"}
        </Text>
      </Box>
    </Button>
  );
};
