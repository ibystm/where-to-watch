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
import { handleErrorByCodes } from "../../utils/firebase/handleError";
import { ErrorMessage } from "../error-message/ErrorMessage";
import { schema } from "./schema";
import { useSignIn } from "./useSignIn";

export const SiginIn: React.FC = () => {
  const { errors, isValid, touched, values, handleChange, handleBlur } =
    useFormik(schema);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { signIn } = useSignIn();
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (errors.email && errors.password) {
      return;
    }
    await signIn(values.email, values.password).catch((e) => {
      if (e.code && e.code === 400) {
        const msg = handleErrorByCodes(e.code);
        setErrorMessage(msg);
      }
    });
    navigate("/");
  };
  const onKeyDownEnter = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") return;
    handleSubmit();
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
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
              <FormControl isInvalid={!!errors.email && !!touched.email}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input
                    id="email"
                    value={values.email}
                    type="email"
                    placeholder="email address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    borderRadius="20px"
                  />
                </InputGroup>
                {errors.email && touched.email && (
                  <FormErrorMessage fontSize="14px">
                    {errors.email}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.password && !!touched.password}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    borderRadius="20px"
                    onKeyDown={onKeyDownEnter}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && touched.password && (
                  <FormErrorMessage fontSize="14px">
                    {errors.password}
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
                disabled={!isValid}
              >
                Signin
              </Button>
              <ErrorMessage message={errorMessage} />
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        <Button
          color="purple.500"
          onClick={() => {
            navigate("/signup");
          }}
          variant="link"
          p={1}
        >
          Sign Up
        </Button>
      </Box>
      <Box>Or</Box>
      <Button
        onClick={() => {
          navigate("/");
        }}
        variant="link"
        p={1}
      >
        Use without account
      </Button>
    </Flex>
  );
};
