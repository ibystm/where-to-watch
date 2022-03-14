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
      height="256px"
      maxW="192px"
      variant="unstyled"
      borderRadius="20px"
      display="flex"
      flexDirection="column"
      _focus={{ _focus: "none" }}
    >
      <Image
        src={poster_path ? pathBuilder(poster_path) : undefined}
        alt={title ? title : "movie poster"}
        boxSize="85%"
        borderRadius="inherit"
      />
      <Box w="100%">
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
