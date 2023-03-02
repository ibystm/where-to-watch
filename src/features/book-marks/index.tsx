import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { PagebackButton } from "../../commons/comoponents/page-back-button/PageBackButton";
import { ContentItem } from "../home/content-item";
import { SkeltonContentItem } from "../home/skelton-content-item";
import { useBookmark } from "./useBookmarks";

export const BookMarks: React.FC = () => {
  const { loading, bookmarkList, hasBookMarkList, userId } = useBookmark();

  const renderContents = () =>
    loading
      ? [...Array(20)].map((_, idx) => {
          return <SkeltonContentItem key={idx} />;
        })
      : bookmarkList.map((item, idx) => (
          <ContentItem key={idx} contentItem={item} modalOpen={() => {}} />
        ));

  if (userId === null)
    return (
      <VStack>
        <Text fontSize="xl" p="10">
          アカウントを作成すると、作品をブックマークすることができます。
        </Text>
        <Box>
          <Link href="/sign-in" textDecoration="underline">
            サインイン
          </Link>
          <Text marginRight="8px" marginLeft="8px" display="inline-block">
            or
          </Text>
          <Link
            display="inline-block"
            textDecoration="underline"
            href="/signup"
          >
            サインアップ
          </Link>
        </Box>
      </VStack>
    );

  if (!hasBookMarkList) {
    return (
      <VStack p="100">
        <Text fontSize="xl" p="10">
          まだブックマークされた作品がありません。
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
