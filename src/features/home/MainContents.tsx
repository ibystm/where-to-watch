import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "../../store/store";
import { searchMovieSelectors } from "../global/header/selectors/searchMovies";
import { ContentItem } from "./ContentItem";
import { useLoadingControl } from "./hooks/useLoadingControl";
import { contentsSelectors } from "./selectors/contents";
import { SkeltonContentItem } from "./SkeltonContentItem";

export const MainContens: React.FC = () => {
  const { shoulDisplaySearchedContents, shouldDislayTopContents, isLoading } =
    useLoadingControl();
  const contents = useSelector(contentsSelectors.selectContents);
  const searchMovies = useSelector(searchMovieSelectors.searchedMovies);

  return (
    <SimpleGrid minChildWidth="192px" spacing="24px" marginX="40px">
      {shouldDislayTopContents &&
        contents.map((item, idx) => (
          <ContentItem contentItem={item} key={idx} />
        ))}
      {shoulDisplaySearchedContents &&
        searchMovies.length &&
        searchMovies.map((item, idx) => (
          <ContentItem key={idx} contentItem={item} />
        ))}
      {isLoading &&
        [...Array(100)].map((a, idx) => <SkeltonContentItem key={idx} />)}
    </SimpleGrid>
  );
};
