import { Box } from "@chakra-ui/react";
import { useAccountInfo } from "./useMyProfile";

// TODO
export const MyProfile: React.FC = () => {
  useAccountInfo();
  return <Box></Box>;
};
