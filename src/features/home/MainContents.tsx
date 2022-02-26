import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "../../store/store";
import { ContentItem } from "./ContentItem";
import { selectContents } from "./slice/contents";

export const MainContens: React.FC = () => {
  const contents = useSelector(selectContents);
  return (
    <SimpleGrid minChildWidth="192px" spacing="24px" marginX="40px">
      {contents.map((item, idx) => (
        <ContentItem contentItem={item} key={idx} />
      ))}
    </SimpleGrid>
  );
};
