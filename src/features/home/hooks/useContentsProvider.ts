import { useEffect, useState } from "react";
import { getMovieWatchProvider } from "../../../apis/contents";
import {
  ProviderDetailInfo,
  WatchProviderResult,
} from "../../../apis/types/discovers";

export type DisplayWatchProviderResult = {
  link: string;
  // 生のデータは他にもあるけど一旦これだけ定義
  flatrate: ProviderDetailInfo[];
};
const initialData: DisplayWatchProviderResult = {
  link: "",
  flatrate: [],
};

export const useContentsProvider = (contentsId: number): typeof result => {
  const [providerData, setProviderData] =
    useState<DisplayWatchProviderResult>(initialData);
  const convertWatchProviderResult = (
    item: WatchProviderResult
  ): DisplayWatchProviderResult => {
    return {
      link: item.link ? item.link : "",
      flatrate: item.flatrate ? item.flatrate : [],
    };
  };
  const getProvider = async () => {
    try {
      const { results } = await getMovieWatchProvider(contentsId);
      if ("JP" in results) {
        setProviderData(convertWatchProviderResult(results.JP));
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

  const resetCurrentData = (): void => {
    setProviderData(initialData);
  };

  const result = {
    providerData,
    resetCurrentData,
  };

  return result;
};
