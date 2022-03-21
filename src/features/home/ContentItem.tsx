import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { MdOutlineHideImage } from "react-icons/md";
import { commonDictionaries } from "../../commons/constants/dictionaries";
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
      {poster_path ? (
        <Image
          marginX="auto"
          src={poster_path ? pathBuilder(poster_path) : undefined}
          alt={title ? title : "movie poster"}
          boxSize="85%"
          borderRadius="inherit"
          loading="lazy"
        />
      ) : (
        <Flex
          boxSize="85%"
          backgroundColor="gray.200"
          borderRadius="inherit"
          flexDir="column"
          justify="center"
          alignItems="center"
        >
          <Icon
            as={MdOutlineHideImage}
            height="100px"
            width="100px"
            color="gray.400"
          />
          <Text color="gray.400">{commonDictionaries.noImageIcon}</Text>
        </Flex>
      )}
      <Box w="100%" mt="4px">
        <Text
          fontSize="sm"
          fontWeight="bold"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          color="gray.600"
        >
          {title ? title : commonDictionaries.noTitle}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {releaseDate ? releaseDate : commonDictionaries.noReleaseDate}
        </Text>
      </Box>
    </Button>
  );
};
