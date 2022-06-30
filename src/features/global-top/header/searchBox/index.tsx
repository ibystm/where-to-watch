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
import { Formik, FormikProps } from "formik";
import { useRef } from "react";
import { commonDictionaries } from "../../../../commons/constants/dictionaries";
import { checkIsMacOS } from "../../../../utils/checkOS";
import {
  SearchMovieFormValues,
  useSearchMoviesByKeyword,
} from "../hooks/useSearchContentsByKeyword";
import { SearchForm } from "./SearchForm";

const initialValues = {
  searchName: "",
};

export const GlobalSearchBox = () => {
  const formikRef = useRef<FormikProps<SearchMovieFormValues>>(null);
  const { handleSubmit, isOpen, onClose, onOpen } = useSearchMoviesByKeyword();

  return (
    <>
      <Button
        w="100%"
        h="100%"
        p="4"
        borderRadius="inherit"
        display="flex"
        columnGap="2"
        justifyContent="space-between"
        onClick={onOpen}
        color="gray.400"
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
        <ModalContent backgroundColor="white" borderRadius="20px">
          <ModalBody>
            <Formik
              innerRef={formikRef}
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              <SearchForm onCloseModal={onClose} />
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
