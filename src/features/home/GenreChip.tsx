import { Button } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store/store";
import { Genre } from "../../types/redux/genres";
import { contentModeActions } from "../global/header/slice/contentsMode";

type Props = {
  genre: Genre;
};

export const GenreChip: React.FC<Props> = ({ genre }) => {
  const selectedGenre = useSelector(
    (state) => state.contentsMode.selectedGenreId
  );
  const ref = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ref.current === null) return;

    if (selectedGenre === genre.id) {
      ref.current.focus();
    }
  }, [genre.id, selectedGenre]);

  return (
    <Button
      marginY="2"
      height="12"
      variant="outline"
      borderRadius="20px"
      padding="8px 16px"
      flexShrink="0"
      onClick={() => dispatch(contentModeActions.selectGenre(genre.id))}
      ref={ref}
    >
      {genre.name}
    </Button>
  );
};
