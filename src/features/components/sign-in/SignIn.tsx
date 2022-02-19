import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useHandleFBErrors } from "../../hooks/useHandleFBErrors";
import { useSignIn } from "../../hooks/useSignIn";
import { ErrorMessage } from "../error-message/ErrorMessage";

const validationScheme = {
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema: Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8, "8文字以上にしてください"),
  }),
  onSubmit: () => {
    console.log("submit is Done!!");
  },
};

export const SiginIn: React.VFC = () => {
  const formik = useFormik(validationScheme);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { handleErrorByCodes } = useHandleFBErrors();
  const { signIn } = useSignIn();
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const toSignUpPage = () => {
    navigate("/signup");
  };
  const handleSubmit = async () => {
    if (formik.errors.email && formik.errors.password) {
      return;
    }
    await signIn(formik.values.email, formik.values.password).catch((e) => {
      console.log(typeof e.code);
      if (e.code && e.code === 400) {
        const msg = handleErrorByCodes(e.code);
        setErrorMessage(msg);
      }
    });
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      // backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading size="2xl" color="purple.400" mb="32px">
          Welcome Back !!
        </Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack spacing={8} p="1rem" boxShadow="2xl" borderRadius="20px">
              <FormControl isInvalid={!!formik.errors.email}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input
                    id="email"
                    value={formik.values.email}
                    type="email"
                    placeholder="email address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    borderRadius="20px"
                  />
                </InputGroup>
                {formik.errors.email && formik.touched.email && (
                  <FormErrorMessage fontSize="14px">
                    {formik.errors.email}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!formik.errors.password}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    borderRadius="20px"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.errors.password && formik.touched.password && (
                  <FormErrorMessage fontSize="14px">
                    {formik.errors.password}
                  </FormErrorMessage>
                )}
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius="20px"
                variant="solid"
                colorScheme="purple"
                width="full"
                onClick={handleSubmit}
                disabled={!formik.isValid}
              >
                Signin
              </Button>
              <ErrorMessage message={errorMessage} />
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to use ?{" "}
        <Button color="purple.500" onClick={toSignUpPage} variant="link">
          Sign Up
        </Button>
      </Box>
    </Flex>
  );
};
