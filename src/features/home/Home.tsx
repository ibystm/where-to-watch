import { Box, Spinner } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "../../store/store";
import { useFetchConfigs } from "./hooks/useFetchConfigs";
import { useFetchContents } from "./hooks/useFetchContents";
import { MainContens } from "./MainContents";
import { selectLoadingState } from "./slice/contents";

export const Home: React.VFC = () => {
  const loadingContents = useSelector(selectLoadingState);
  // initial process
  useFetchContents();
  useFetchConfigs();

  // TODO
  // const {signOut} = useSignOut();
  // const handleSubmit = async () => {
  //   signOut().catch((e) => {
  //     console.log(e);
  //   });
  // };
  return loadingContents ? (
    <Spinner color="red.500" size="xl" />
  ) : (
    <Box mt="160px" w="100%" h="100%">
      <MainContens />
    </Box>
  );
};
