import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { ContentItem } from "./ContentItem";
import { useDisplayContentsControl } from "./hooks/useDisplayContentsControl";
import { SkeltonContentItem } from "./SkeltonContentItem";

export const MainContens: React.FC = () => {
  const { isLoading, displayContents } = useDisplayContentsControl();

  return (
    <SimpleGrid minChildWidth="240px" spacing="24px" marginX="40px">
      {!isLoading &&
        displayContents.map((item, idx) => (
          <ContentItem key={idx} contentItem={item} />
        ))}
      {isLoading &&
        [...Array(100)].map((a, idx) => <SkeltonContentItem key={idx} />)}
    </SimpleGrid>
  );
};
