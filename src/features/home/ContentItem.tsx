import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
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
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const imageUrl = useSelector(configurationsSelector.secureImageUrl);
  const posterSizes = useSelector(configurationsSelector.posterSizes);
  const pathBuilder = (): string | undefined => {
    if (!posterSizes || !imageUrl) return;
    const size = posterSizes.slice(-1)[0];

    return `${imageUrl}/${size}/${poster_path}`;
  };

  return (
    <Button
      height="320px"
      minW="200px"
      maxW="240px"
      width="100%"
      variant="unstyled"
      borderRadius="24px"
      padding="8px 8px"
      backgroundColor="white"
      marginRight="24px"
      boxShadow="10px 10px 24px #e6e6e6, -10px -10px 24px #ffffff"
      _focus={{ _focus: "none" }}
      _hover={{
        transition: "all 0.5s 0.5s",
        transform: "scale(1.15, 1.15)",
        zIndex: 10,
        boxShadow: "10px 10px 20px #dedede -10px -10px 20px #ffffff",
      }}
    >
      {poster_path ? (
        <Image
          marginX="auto"
          src={poster_path ? pathBuilder() : undefined}
          alt={title ? title : "movie poster"}
          opacity={isImgLoaded ? 10 : 0}
          transition="all 1s"
          boxSize="85%"
          borderRadius="inherit"
          loading="lazy"
          onLoad={() => setIsImgLoaded(true)}
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
          {releaseDate
            ? "公開日: " + releaseDate
            : commonDictionaries.noReleaseDate}
        </Text>
      </Box>
    </Button>
  );
};
