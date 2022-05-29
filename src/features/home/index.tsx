import { Box } from "@chakra-ui/react";
import React from "react";
import { useFetchConfigs } from "./hooks/useFetchConfigs";
import { useFetchContents } from "./hooks/useFetchContents";
import { MainArea } from "./main-area";

export const Home: React.FC = () => {
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
    <Box w="100%" h="100%" paddingX="40px" paddingBottom="40px">
      <MainArea />
    </Box>
  );
};
