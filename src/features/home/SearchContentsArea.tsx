import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useSelector } from "../../store/store";
import {
  searchedContentsSelector,
  searchKeywordSelector,
} from "../global/header/selectors/searchContents";
import { ContentItem } from "./ContentItem";
import { SkeltonContentItem } from "./SkeltonContentItem";

export const SearchContentsArea: React.VFC = () => {
  const contents = useSelector(searchedContentsSelector.selectAll);
  const searchedKeyword = useSelector(searchKeywordSelector);
  const searchedContentsArea = false
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
function searchedMovies(searchedMovies: any) {
  throw new Error("Function not implemented.");
}
