import { Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineHideImage } from "react-icons/md";
import { commonDictionaries } from "../../../commons/constants/dictionaries";
import { useSelector } from "../../../store";
import { ActualContentData } from "../../../types/redux/discovers";
import {
  selectPosterSizes,
  selectSecureBaseUrl,
} from "../../configurations/slice";

type P = {
  contentItem: ActualContentData;
  modalOpen: (contentItem: ActualContentData) => void;
};

export const ContentItem: React.FC<P> = ({ contentItem, modalOpen }) => {
  const { title, poster_path, releaseDate } = contentItem;
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const imageUrl = useSelector(selectSecureBaseUrl);
  const posterSizes = useSelector(selectPosterSizes);
  const pathBuilder = (): string | undefined => {
    if (!posterSizes || !imageUrl) return;
    const size = posterSizes.slice(-1)[0];

    return `${imageUrl}/${size}/${poster_path}`;
  };

  return (
    <Button
      onClick={() => {
        modalOpen(contentItem);
      }}
      height="320px"
      minW="200px"
      maxW="240px"
      width="100%"
      variant="unstyled"
      borderRadius="24px"
      padding="8px 8px"
      backgroundColor="inherit"
      marginRight="24px"
      _focus={{ boxShadow: "none" }}
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
          marginX="auto"
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

      <Text
        mt="1"
        fontSize="sm"
        fontWeight="bold"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {title ? title : commonDictionaries.noTitle}
      </Text>
      <Text fontSize="sm">
        {releaseDate
          ? `${commonDictionaries.releaseDate}: ${releaseDate.replaceAll(
              "-",
              "/"
            )}`
          : commonDictionaries.noReleaseDate}
      </Text>
    </Button>
  );
};
