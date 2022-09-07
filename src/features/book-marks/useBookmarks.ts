import { useEffect, useState } from "react";
import { fetchMovieDetail, fetchTvDetail } from "../../apis/contents/index";
import { ContentDetail } from "../../apis/types/ContentDetails";
import { collectionReferences } from "../../db/constants/collectionReferences";
import { useSelector } from "../../store";
import { ModeType } from "../../types/redux/contentsMode";
import { getDocs } from "../../utils/firebase/firestore/documentsHelper";

export const useBookmark = (): typeof result => {
  const userId = useSelector((s) => s.user.id);
  const [loading, setLoading] = useState(false);
  const [bookmarkList, setBookmarkList] = useState<ContentDetail[]>([]);
  const hasBookMarkList = bookmarkList.length > 0;

  useEffect(() => {
    if (userId === null) return;
    setLoading(true);
    getDocs(collectionReferences.bookmarks(userId))
      .then(async (data) => {
        if (!data) {
          return;
        }
        const res = await Promise.all(
          data.map((d) =>
            d.modeIndex === ModeType.Movie
              ? fetchMovieDetail(d.tmdbId)
              : fetchTvDetail(d.tmdbId)
          )
        );
        setBookmarkList(res);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const result = {
    loading,
    bookmarkList,
    hasBookMarkList,
  };

  return result;
};
