import { useSelector } from "../../../store";
import { ContentItem } from "../content-item";
import { useContentsProvider } from "../hooks/useContentsProvider";
import { useModalControl } from "../hooks/useModalControl";
import {
  popularMovieSelector,
  popularTVsSelector,
} from "../selectors/popularities";
import { SkeltonContentItem } from "../skelton-content-item";
import {
  discoverMoviesSelector,
  discoverTVsSelector,
} from "../slice/discovers";

export const useContentsArea = (): typeof result => {
  const { modeIndex, selectedGenreId } = useSelector((s) => s.contentsMode);
  const isLoading = useSelector((s) => s.loading.isLoading);
  const moviesByGenres = useSelector(discoverMoviesSelector.selectAll);
  const tvsByGenres = useSelector(discoverTVsSelector.selectAll);
  const popularMovies = useSelector(popularMovieSelector.selectAll);
  const popularTVs = useSelector(popularTVsSelector.selectAll);
  const movies = selectedGenreId === 0 ? popularMovies : moviesByGenres;
  const tvs = selectedGenreId === 0 ? popularTVs : tvsByGenres;

  const resultContents = modeIndex === 0 ? movies : tvs;

  const { currentContent, handleClose, handleOpen, isOpen } = useModalControl();
  const { providerData, resetCurrentData, youtubeUrl } = useContentsProvider(
    currentContent?.id ? currentContent.id : 0
  );

  const handleCloseModal = (): void => {
    resetCurrentData();
    handleClose();
  };

  const renderContents = () =>
    isLoading
      ? [...Array(20)].map((_, idx) => {
          return <SkeltonContentItem key={idx} />;
        })
      : resultContents.map((item, idx) => (
          <ContentItem key={idx} contentItem={item} modalOpen={handleOpen} />
        ));

  const result = {
    resultContents,
    providerData,
    handleCloseModal,
    handleOpen,
    isOpen,
    isLoading,
    currentContent,
    youtubeUrl,
    renderContents,
  };
  return result;
};
