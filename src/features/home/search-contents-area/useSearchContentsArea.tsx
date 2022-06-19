import { useSelector } from "../../../store";
import { ModeType } from "../../../types/redux/contentsMode";
import {
  searchedContentsSelector,
  searchKeywordSelector,
} from "../../global-top/header/selectors/searchContents";
import { ContentItem } from "../content-item/index";
import { useContentsProvider } from "../hooks/useContentsProvider";
import { useModalControl } from "../hooks/useModalControl";
import { SkeltonContentItem } from "../skelton-content-item/index";

export const useSearchContentsArea = (): typeof result => {
  const loading = useSelector((s) => s.loading.isLoading);
  const modeIndex = useSelector((s) => s.contentsMode.modeIndex);
  const contents = useSelector(searchedContentsSelector.selectAll);
  const searchedKeyword = useSelector(searchKeywordSelector);
  const { isOpen, handleClose, handleOpen, currentContent } = useModalControl();
  const { providerData, resetCurrentData, youtubeUrl } = useContentsProvider(
    currentContent?.id ? currentContent.id : 0
  );

  const handleCloseModal = (): void => {
    resetCurrentData();
    handleClose();
  };
  const currentMode = modeIndex === ModeType.Movie ? "映画" : "ドラマ";

  const renderContents = () =>
    loading
      ? [...Array(20)].map((_, idx) => {
          return <SkeltonContentItem key={idx} />;
        })
      : contents.map((item, idx) => (
          <ContentItem key={idx} contentItem={item} modalOpen={handleOpen} />
        ));

  const result = {
    handleCloseModal,
    isOpen,
    contents,
    providerData,
    searchedKeyword,
    currentContent,
    currentMode,
    youtubeUrl,
    renderContents,
  };
  return result;
};
