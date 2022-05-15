import { useEffect, useState } from "react";
import { getMovieWatchProvider } from "../../../apis/fetchContents";
import { WatchProviderResult } from "../../../apis/types/discovers";

const initialData: WatchProviderResult = {
  link: "",
};

export const useContentsProvider = (contentsId: number): typeof result => {
  const [providerData, setProviderData] =
    useState<WatchProviderResult>(initialData);
  const getProvider = async () => {
    try {
      const { results } = await getMovieWatchProvider(contentsId);
      if ("JP" in results) {
        setProviderData(results.JP);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (contentsId) {
      getProvider();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentsId]);

  const result = {
    providerData,
  };

  return result;
};
