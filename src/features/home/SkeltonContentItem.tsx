import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export const SkeltonContentItem = () => {
  return (
    <Box height="296px" maxW="240px" padding="8px 16px">
      <Skeleton
        variant="unstyled"
        borderRadius="20px"
        boxSize="85%"
        marginX="auto"
      />
      <SkeletonText width="85%" mt="4px" noOfLines={2} marginX="auto" />
    </Box>
  );
};
