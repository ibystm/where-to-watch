import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store/store";
import { Genre } from "../../types/redux/genres";
import { contentModeActions } from "../global/header/slice/contentsMode";

type Props = {
  genre: Genre;
};

export const GenreChip: React.FC<Props> = ({ genre }) => {
  const { selectedGenreId } = useSelector((state) => state.contentsMode);
  const dispatch = useDispatch();
  const shouldFocus = selectedGenreId === genre.id;

  return (
    <Button
      marginY="2"
      height="12"
      variant="outline"
      borderRadius="20px"
      padding="8px 16px"
      flexShrink="0"
      color={shouldFocus ? "white" : "none"}
      backgroundColor={shouldFocus ? "gray.700" : "none"}
      onClick={() => dispatch(contentModeActions.selectGenre(genre.id))}
    >
      {genre.name}
    </Button>
  );
};
