import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { PagebackButton } from "../../commons/comoponents/page-back-button/PageBackButton";
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
      <VStack p="100">
        <Text fontSize="xl" p="10">
          まだブックマークされた作品がありません
        </Text>
        <PagebackButton />
      </VStack>
    );
  }

  return (
    <VStack p="8" w="100%" h="100%">
      <Heading size="lg" marginLeft="4">
        ブックマークされた作品
      </Heading>
      <Box p="5" w="100%">
        {renderContents()}
      </Box>
      <PagebackButton />
    </VStack>
  );
};
