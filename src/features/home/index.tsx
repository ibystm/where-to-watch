import { Box } from "@chakra-ui/react";
import React from "react";
import { MainArea } from "./main-area";
import { useHome } from "./useHome";

export const Home: React.FC = () => {
  useHome();

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
