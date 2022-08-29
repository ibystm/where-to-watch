import { useEffect, useState } from "react";
import { baseRepository } from "../../apis/axios";
import { endPoints } from "../../apis/endPoints";
import { ContentDetail } from "../../apis/types/ContentDetails";
import { collectionReferences } from "../../db/constants/collectionReferences";
import { useSelector } from "../../store";
import { getDocs } from "../../utils/firebase/firestore/documentsHelper";

export const useBookmark = (): typeof result => {
  const userId = useSelector((s) => s.user.id);
  const [loading, setLoading] = useState(false);
  const [bookmarkList, setBookmarkList] = useState<ContentDetail[]>([]);
  const hasBookMarkList = bookmarkList.length > 0;

  const fetchContentsDetail = async (
    tmdbId: string
  ): Promise<ContentDetail[]> => {
    const id = Number(tmdbId);
    try {
      return await (
        await baseRepository.get(endPoints.getMovieDetail(Number(id)))
      ).data;
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    if (userId === null) return;
    setLoading(true);
    getDocs(collectionReferences.bookmarks(userId))
      .then(async (data) => {
        if (!data) {
          return;
        }
        const res = await Promise.all(
          data.map((d) => fetchContentsDetail(d.tmdbId))
        );
        // setBookmarkList(res);
        console.log({ res });
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
