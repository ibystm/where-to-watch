import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import TBDBLogo from "../../../src/assets/images/tmdbLogo.svg";

export const Credits: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      p="4"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading p="2">Credits</Heading>
      <Heading as="h1" size="sm" p="4">
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </Heading>
      <Flex pb="4">
        <Box>
          <Text>All data in this web site is providered by</Text>
        </Box>
        <Box ml="4">
          <Image src={TBDBLogo} alt="tmdb image" width="64px" />
        </Box>
      </Flex>
      <Button size="lg" onClick={() => navigate(-1)} colorScheme="purple">
        Go back
      </Button>
    </Box>
  );
};
