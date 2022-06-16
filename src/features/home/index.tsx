import { Box } from "@chakra-ui/react";
import React from "react";
import { ContentsArea } from "./contents-area";
import { SearchContentsArea } from "./search-contents-area";
import { wrapperStyleProps } from "./style";
import { useHome } from "./useHome";

export const Home: React.FC = () => {
  const { isSearchMode } = useHome();

  // TODO
  // const {signOut} = useSignOut();
  // const handleSubmit = async () => {
  //   signOut().catch((e) => {
  //     console.log(e);
  //   });
  // };
  return (
    <Box {...wrapperStyleProps}>
      {isSearchMode ? <SearchContentsArea /> : <ContentsArea />}
    </Box>
  );
};
