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
      <Flex>
        <Box>
          <Text>All data in this web site is providered by</Text>
        </Box>
        <Box ml="4">
          <Image src={TBDBLogo} alt="tmdb image" width="80px" />
        </Box>
      </Flex>
      <Button w="120px" mt="40px" p="24px" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </Box>
  );
};
