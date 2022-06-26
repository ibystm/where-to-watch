import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Formik, FormikProps } from "formik";
import { useRef } from "react";
import { commonDictionaries } from "../../../../commons/constants/dictionaries";
import { useSearchMoviesByKeyword } from "../hooks/useSearchContentsByKeyword";
import { SearchForm, SearchMovieFormValues } from "./SearchForm";

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
        boxShadow="10px 10px 24px #e6e6e6, -10px -10px 24px #ffffff"
        borderRadius="inherit"
        display="flex"
        columnGap="2"
        justifyContent="left"
        onClick={onOpen}
        color="gray.400"
      >
        <Icon as={SearchIcon} color="gray.400" />
        <Text>{commonDictionaries.titleName}</Text>
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
