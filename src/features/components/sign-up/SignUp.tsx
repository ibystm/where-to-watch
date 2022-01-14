import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage } from "../error-message/ErrorMessage";

const validationScheme = {
  initialValues: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required("必須です")
      .min(5, "5文字以上にしてください")
      .max(8, "8文字以上にしてください"),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8, "8文字以上にしてください"),
    confirmPassword: Yup.string().required().min(8, "8文字以上にしてください"),
  }),
  onSubmit: () => {
    console.log("submit is Done!!");
  },
};

export const SiginUp: React.VFC = () => {
  const formik = useFormik(validationScheme);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const toSignInPage = () => {
    navigate("/signin");
  };
  console.log("##########", formik.errors.email);
  console.log("##########", formik.errors.username);
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
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
          Create a Account
        </Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Stack
            spacing={6}
            p="1rem"
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
            borderRadius="8px"
          >
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none" />
                <Input
                  value={formik.values.username}
                  // type="text"
                  name="username"
                  placeholder="User name"
                  onChange={formik.handleChange}
                  borderRadius="8px"
                />
              </InputGroup>
              {formik.errors.username && (
                <ErrorMessage message={formik.errors.username} />
              )}
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none" />
                <Input
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="email address"
                  borderRadius="8px"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.300" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  borderRadius="8px"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.300" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  borderRadius="8px"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              borderRadius="8px"
              type="submit"
              variant="solid"
              colorScheme="purple"
              width="full"
            >
              Signin
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Box>
        You have a account ?{" "}
        <Button color="purple.500" onClick={toSignInPage}>
          Sign In
        </Button>
      </Box>
    </Flex>
  );
};
