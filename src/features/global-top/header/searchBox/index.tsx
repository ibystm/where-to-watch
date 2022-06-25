import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Formik, FormikProps } from "formik";
import { useRef } from "react";
import { commonDictionaries } from "../../../../commons/constants/dictionaries";
import { SearchForm, SearchMovieFormValues } from "./SearchForm";

const initialValues = {
  searchName: "",
};

export const GlobalSearchBox = () => {
  const formikRef = useRef<FormikProps<SearchMovieFormValues>>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Input
        placeholder={commonDictionaries.titleName}
        name="searchName"
        focusBorderColor="purple.300"
        boxShadow="10px 10px 24px #e6e6e6, -10px -10px 24px #ffffff"
        borderRadius="inherit"
        value=""
        onClick={() => onOpen()}
        onChange={() => onOpen()}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="white" borderRadius="20px">
          <ModalBody>
            <Formik
              innerRef={formikRef}
              initialValues={initialValues}
              onSubmit={() => console.log("submit!!!")}
            >
              <SearchForm onCloseModal={onClose} />
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
