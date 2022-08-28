import { useBookmark } from "./useBookmarks";

export const BookMarks: React.FC = () => {
  const { bookmarkList } = useBookmark();
  if (bookmarkList.length === 0) return null;

  return <div>なにかリストはあるっぽいよ</div>;
};
