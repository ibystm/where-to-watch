import { Box, Flex, Text } from "@chakra-ui/react";
import { ActualContentData } from "../../../types/redux/discovers";

export const SearchResultHelperTextArea: React.FC<{
  contents: ActualContentData[];
  searchedKeyword: string;
  currentMode: string;
}> = ({ contents, searchedKeyword, currentMode }) => {
  return contents.length > 0 ? (
    <Box marginLeft="32px" paddingY="16px">
      <Text fontSize="2xl" fontWeight="bold" color="gray.800">
        キーワード: {`${searchedKeyword} の検索結果`}
      </Text>
    </Box>
  ) : (
    <Flex justifyContent="center" pt="100px">
      <Text fontSize="xl">
        キーワード:{" "}
        {`${searchedKeyword}に一致する${currentMode}の結果はありませんでした。`}
      </Text>
    </Flex>
  );
};
