import { Box, Flex, Text } from "@chakra-ui/react";
import { ActualContentData } from "../../../types/redux/discovers";
import { ResetButton } from "./ResetButton";

export const SearchResultHelperTextArea: React.FC<{
  contents: ActualContentData[];
  searchedKeyword: string;
  currentMode: string;
}> = ({ contents, searchedKeyword, currentMode }) => {
  return contents.length > 0 ? (
    <Box marginLeft="32px" paddingY="16px" display="flex" gap="3">
      <Text fontSize="2xl" fontWeight="bold">
        キーワード: {`"${searchedKeyword}" 、${currentMode}での検索結果`}
      </Text>
      <ResetButton />
    </Box>
  ) : (
    <Flex
      justifyContent="center"
      pt="100px"
      flexDirection="column"
      alignItems="center"
      gap="3"
    >
      <Text fontSize="xl">
        {`キーワード: ${searchedKeyword}に一致する${currentMode}の結果はありませんでした。`}
      </Text>
      <Box p="3">
        <ResetButton />
      </Box>
    </Flex>
  );
};
