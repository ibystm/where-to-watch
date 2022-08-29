import { Box, Text } from "@chakra-ui/react";
import { ContentItem } from "../home/content-item";
import { SkeltonContentItem } from "../home/skelton-content-item";
import { useBookmark } from "./useBookmarks";

export const BookMarks: React.FC = () => {
  const { loading, bookmarkList, hasBookMarkList } = useBookmark();

  const renderContents = () =>
    loading
      ? [...Array(20)].map((_, idx) => {
          return <SkeltonContentItem key={idx} />;
        })
      : bookmarkList.map((item, idx) => (
          <ContentItem key={idx} contentItem={item} modalOpen={() => {}} />
        ));

  if (!hasBookMarkList) {
    return (
      <Box p="100">
        <Text fontSize="xl">まだブックマークされた作品がありません</Text>
      </Box>
    );
  }

  return <> {renderContents()}</>;
};
