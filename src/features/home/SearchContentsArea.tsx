import { SimpleGrid } from "@chakra-ui/react";
import { useSelector } from "../../store/store";
import { searchMovieSelectors } from "../global/header/selectors/searchMovies";
import { ContentItem } from "./ContentItem";
import { SkeltonContentItem } from "./SkeltonContentItem";

export const SearchContentsArea: React.VFC = () => {
  const isLoading = useSelector(searchMovieSelectors.loadingState);
  const contents = useSelector(searchMovieSelectors.searchedMovies);
  const searchedContentsArea = isLoading
    ? [...Array(100)].map((_, idx) => <SkeltonContentItem key={idx} />)
    : contents.map((item, idx) => <ContentItem key={idx} contentItem={item} />);

  return (
    <SimpleGrid minChildWidth="240px" spacing="24px" marginTop="8px">
      {searchedContentsArea}
    </SimpleGrid>
  );
};
