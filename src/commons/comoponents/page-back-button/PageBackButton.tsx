import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const PagebackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)} colorScheme="purple">
      <Icon as={ChevronLeftIcon} w="6" h="6" />
      Go back
    </Button>
  );
};
