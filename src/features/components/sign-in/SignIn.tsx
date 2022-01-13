import {
  Box,
  Button,
  Flex,
  FormControl,
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

const validationScheme = {
  initialValues: {
    email: "",
    password: "",
  },
  validationScheme: Yup.object({
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
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const toSignUpPage = () => {
    navigate("/signup");
  };

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
        {/* <Avatar bg="purple.500" /> */}
        <Heading size="2xl" color="purple.400" mb="32px">
          Welcome Back !!
        </Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={8}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              borderRadius="8px"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    // children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    value={formik.values.email}
                    type="email"
                    name="email"
                    placeholder="email address"
                    onChange={formik.handleChange}
                    borderRadius="8px"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    // children={<CFaLock color="gray.300" />}
                  />
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
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
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
          </form>
        </Box>
      </Stack>
      <Box>
        New to use ?{" "}
        <Button color="purple.500" onClick={toSignUpPage}>
          Sign Up
        </Button>
      </Box>
    </Flex>
  );
};
