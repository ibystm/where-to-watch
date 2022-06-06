import { Box, Heading, Image } from "@chakra-ui/react";
import TBDBLogo from "../../../src/assets/images/tmdbLogo.svg";

export const Credits: React.FC = () => {
  return (
    <Box
      p="4"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h1" size="md" p="4">
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </Heading>
      <Box>
        <Image src={TBDBLogo} alt="tmdb image" width="80px" />
      </Box>
    </Box>
  );
};
