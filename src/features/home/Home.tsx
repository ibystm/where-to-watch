import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { baseRepository } from "../../apis/axios";
import { selectUser } from "../../store/slices/usersSlice";
import { useSelector } from "../../store/store";
import { useSignOut } from "../hooks/useSignOut";
import { MainContens } from "./MainContents";

export const Home: React.VFC = () => {
  const user = useSelector(selectUser);
  const { signOut } = useSignOut();
  // 多分このcomponenentでfetchしてReduxにいれておくとよさそう。
  const handleSubmit = async () => {
    signOut().catch((e) => {
      console.log(e);
    });
  };
  const [any, setAny] = useState<any>();
  useEffect(() => {
    const fn = () => {
      baseRepository
        .get(
          "/discover/movie?api_key=d5e63512bc9d94343e4da4b84dca4d71&language=ja&page=30"
        )
        .then((res) => {
          setAny(Array.isArray(res.data.results) && res.data.results.length);
        });
    };
    fn();
  }, []);
  return (
    <Box mt="160px" w="100%" h="100%">
      <MainContens />
    </Box>
  );
};
