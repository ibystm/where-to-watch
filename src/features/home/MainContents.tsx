import { Box } from "@chakra-ui/react";
import React from "react";
import { ContentItemRow } from "./ContentItemRow";

const ContentCategories = {
  DiscoverMovies: "DiscoverMovies",
  DiscoverTVShows: "DiscoverTVShows",
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ContentCategories =
  typeof ContentCategories[keyof typeof ContentCategories];

export const MainContens: React.FC = () => {
  return (
    <Box paddingX="40px">
      {Object.keys(ContentCategories).map((name) => (
        <ContentItemRow categoryName={name as ContentCategories} />
      ))}
    </Box>
  );
};
