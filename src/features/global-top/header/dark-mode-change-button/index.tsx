import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

export const DarkModeChangeButton: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="Search database"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      borderRadius="20px"
    />
  );
};
