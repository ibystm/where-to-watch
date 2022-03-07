import { Box } from "@chakra-ui/react";
import React from "react";
import { useFetchConfigs } from "./hooks/useFetchConfigs";
import { useFetchContents } from "./hooks/useFetchContents";
import { MainContens } from "./MainContents";

export const Home: React.VFC = () => {
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
  return (
    <Box mt="160px" w="100%" h="100%">
      <MainContens />
    </Box>
  );
};
