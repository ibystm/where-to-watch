import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  Kbd,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { commonDictionaries } from "../../../../commons/constants/dictionaries";
import { checkIsMacOS } from "../../../../utils/checkOS";
import { useSearchMoviesByKeyword } from "../hooks/useSearchContentsByKeyword";
import { SearchForm } from "./SearchForm";

export const GlobalSearchBox = () => {
  const { handleSubmit, isOpen, onClose, onOpen, getInitialValue } =
    useSearchMoviesByKeyword();

  return (
    <>
      <Button
        h="100%"
        w="100%"
        p="4"
        borderRadius="inherit"
        display="flex"
        columnGap="2"
        justifyContent="space-between"
        onClick={onOpen}
        color="gray.400"
        flexGrow="1"
      >
        <Flex>
          <Icon as={SearchIcon} color="gray.400" />
          <Text ml="2">{commonDictionaries.titleName}</Text>
        </Flex>
        <Box>
          <span>
            {checkIsMacOS() ? <Kbd>⌘</Kbd> : <Kbd>Ctrl</Kbd>} + <Kbd>K</Kbd>
          </span>
        </Box>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="20px">
          <ModalBody>
            <Formik initialValues={getInitialValue()} onSubmit={handleSubmit}>
              <SearchForm onCloseModal={onClose} />
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
