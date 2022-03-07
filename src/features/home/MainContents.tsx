import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "../../store/store";
import { ContentItem } from "./ContentItem";
import { selectContents, selectLoadingState } from "./slice/contents";

export const MainContens: React.FC = () => {
  const contents = useSelector(selectContents);
  const loadingContents = useSelector(selectLoadingState);
  return (
    <SimpleGrid minChildWidth="192px" spacing="24px" marginX="40px">
      {!loadingContents &&
        contents.map((item, idx) => (
          <ContentItem contentItem={item} key={idx} />
        ))}
      {loadingContents &&
        [...Array(100)].map((a) => (
          <Skeleton
            height="256px"
            maxW="192px"
            variant="unstyled"
            borderRadius="20px"
          />
        ))}
    </SimpleGrid>
  );
};
