import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useSelector } from "../../store/store";
import { searchMovieSelectors } from "../global/header/selectors/searchMovies";
import { ContentItem } from "./ContentItem";
import { SkeltonContentItem } from "./SkeltonContentItem";

export const SearchContentsArea: React.VFC = () => {
  const isLoading = useSelector(searchMovieSelectors.loadingState);
  const contents = useSelector(searchMovieSelectors.searchedMovies);
  const searchedKeyword = useSelector(searchMovieSelectors.searchKeyword);
  const searchedContentsArea = isLoading
    ? [...Array(100)].map((_, idx) => <SkeltonContentItem key={idx} />)
    : contents.map((item, idx) => <ContentItem key={idx} contentItem={item} />);

  return (
    <Box marginY="24px">
      <Box marginLeft="32px">
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          {`${searchedKeyword} の検索結果`}
        </Text>
      </Box>
      <SimpleGrid minChildWidth="240px" spacing="24px" marginTop="8px">
        {searchedContentsArea}
      </SimpleGrid>
    </Box>
  );
};
