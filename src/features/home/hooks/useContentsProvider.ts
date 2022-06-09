import { useEffect, useState } from "react";
import { getMovieVideos, getMovieWatchProvider } from "../../../apis/contents";
import { getTvVideos } from "../../../apis/contents/index";
import {
  ProviderDetailInfo,
  WatchProviderResult,
} from "../../../apis/types/discovers";
import { useSelector } from "../../../store";
import { ModeType } from "../../../types/redux/contentsMode";

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
  const modeIndex = useSelector((s) => s.contentsMode.modeIndex);
  const [providerData, setProviderData] =
    useState<DisplayWatchProviderResult>(initialData);
  const [videoData, setVideoData] = useState<unknown>();
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
  const getVideos = async () => {
    try {
      if (modeIndex === ModeType.Movie) {
        return await getMovieVideos(contentsId);
      } else {
        return await getTvVideos(contentsId);
      }
    } catch (e) {
      // TODO 後で
      console.error(e);
    }
  };

  useEffect(() => {
    if (!contentsId) return;
    getProvider();
    getVideos().then((res) => {
      if (typeof res?.results === "undefined") return;
      setVideoData(res.results);
    });

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
