import { Box, Button, Image, Text } from "@chakra-ui/react";
import { IMAGE_BASE_URL } from "../../apis/constants";
import { ActualContentData } from "../../types/redux/discovers";

type P = {
  contentItem: ActualContentData;
};

export const ContentItem: React.VFC<P> = ({ contentItem }) => {
  const { title, poster_path, releaseDate } = contentItem;

  const pathBuilder = (path: string): string | undefined => {
    const url = sessionStorage.getItem("secureBaseUrl");
    return url ? `${IMAGE_BASE_URL}/${path}` : "";
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
          {releaseDate ? releaseDate : "リリース日未定"}
        </Text>
      </Box>
    </Button>
  );
};
