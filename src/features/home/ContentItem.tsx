import { Button, Image } from "@chakra-ui/react";
import { IMAGE_BASE_URL } from "../../apis/constants";
import { ActualContentData } from "../../types/redux/discovers";

type P = {
  contentItem: ActualContentData;
};

export const ContentItem: React.VFC<P> = ({ contentItem }) => {
  const { title, poster_path } = contentItem;

  const pathBuilder = (path: string): string | undefined => {
    const url = sessionStorage.getItem("secureBaseUrl");
    return url ? `${IMAGE_BASE_URL}/${path}` : "";
  };

  return (
    <Button height="256px" maxW="192px" variant="unstyled" borderRadius="20px">
      <Image
        src={poster_path ? pathBuilder(poster_path) : undefined}
        alt={title ? title : "movie poster"}
        boxSize="100%"
        borderRadius="inherit"
      />
    </Button>
  );
};
