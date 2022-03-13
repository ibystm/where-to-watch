import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "../../store/store";
import { searchMovieSelectors } from "../global/header/selectors/searchMovies";
import { ContentItem } from "./ContentItem";
import { contentsSelectors } from "./selectors/contents";

export const MainContens: React.FC = () => {
  const contents = useSelector(contentsSelectors.selectContents);
  const loadingContents = useSelector(contentsSelectors.selectLoadingState);
  const searchMovieLoading = useSelector(searchMovieSelectors.loadingState);
  const searchMode = useSelector(searchMovieSelectors.searchMode);
  const searchMovies = useSelector(searchMovieSelectors.searchedMovies);

  return (
    <SimpleGrid minChildWidth="192px" spacing="24px" marginX="40px">
      {!searchMode &&
        !loadingContents &&
        contents.map((item, idx) => (
          <ContentItem contentItem={item} key={idx} />
        ))}
      {searchMode &&
        !searchMovieLoading &&
        searchMovies.length &&
        searchMovies.map((item, idx) => (
          <ContentItem key={idx} contentItem={item} />
        ))}
      {(loadingContents || searchMovieLoading) &&
        [...Array(100)].map((a, idx) => (
          <Skeleton
            key={idx.toString()}
            height="256px"
            maxW="192px"
            variant="unstyled"
            borderRadius="20px"
          />
        ))}
    </SimpleGrid>
  );
};
