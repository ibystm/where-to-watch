import { Box } from "@chakra-ui/react";
import React from "react";
import { useFetchContents } from "./hooks/useFetchContents";
import { MainContens } from "./MainContents";

export const Home: React.VFC = () => {
  useFetchContents();
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
