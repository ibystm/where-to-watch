import { Button } from "@chakra-ui/react";
import { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { actions, useSelector } from "../../../store";
import { Genre } from "../../../types/redux/genres";

type Props = {
  genre: Genre;
};

export const GenreChip = forwardRef<HTMLButtonElement, Props>(
  ({ genre }, ref) => {
    const { selectedGenreId } = useSelector((state) => state.contentsMode);
    const dispatch = useDispatch();
    const shouldFocus = selectedGenreId === genre.id;
    const handleClick = () => {
      dispatch(actions.selectGenre(genre.id));
    };

    return (
      <Button
        ref={ref}
        marginY="2"
        height="12"
        variant="outline"
        borderRadius="20px"
        padding="8px 16px"
        flexShrink="0"
        color={shouldFocus ? "white" : "inherit"}
        backgroundColor={shouldFocus ? "gray.700" : "inherit"}
        onClick={handleClick}
        _hover={{
          backgroundColor: shouldFocus ? "gray.700" : "inherit",
        }}
        _focus={{ boxShadow: "none" }}
      >
        {genre.name}
      </Button>
    );
  }
);
