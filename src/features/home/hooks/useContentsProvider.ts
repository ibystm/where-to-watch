import { useEffect, useState } from "react";
import { getMovieVideos, getMovieWatchProvider } from "../../../apis/contents";
import { getTvVideos, getTVWatchProvider } from "../../../apis/contents/index";
import {
  ProviderDetailInfo,
  WatchProviderResult,
} from "../../../apis/types/discovers";
import { externalSiteUrls } from "../../../commons/constants/externalUrls";
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
  const [youtubeUrl, setYoutubeUrl] = useState<string>();
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
      if (modeIndex === ModeType.Movie) {
        return await getMovieWatchProvider(contentsId);
      } else {
        return await getTVWatchProvider(contentsId);
      }
    } catch (e) {
      throw e;
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
    getProvider().then(({ results }) => {
      if ("JP" in results) {
        setProviderData(convertWatchProviderResult(results.JP));
      }
    });
    getVideos().then((res) => {
      if (typeof res?.results === "undefined") return;
      const item = res.results.find((res) => {
        // TODO siteがYouTube以外増えたら定数で管理する
        return res.site === "YouTube";
      });

      if (typeof item === "undefined" || typeof item.key === "undefined")
        return;
      // TODO: urlだけじゃなくて、typeも返してあげる方が良さそう
      setYoutubeUrl(`${externalSiteUrls.youtube}/embed/${item.key}`);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentsId]);

  const resetCurrentData = (): void => {
    setProviderData(initialData);
    setYoutubeUrl(undefined);
  };

  const result = {
    providerData,
    resetCurrentData,
    youtubeUrl,
  };

  return result;
};
