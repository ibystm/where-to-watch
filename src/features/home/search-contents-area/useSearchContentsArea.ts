import { useSelector } from "../../../store";
import {
  searchedContentsSelector,
  searchKeywordSelector,
} from "../../global-top/header/selectors/searchContents";
import { useContentsProvider } from "../hooks/useContentsProvider";
import { useModalControl } from "../hooks/useModalControl";

export const useSearchContentsArea = (): typeof result => {
  const loading = useSelector((s) => s.loading.isLoading);
  const contents = useSelector(searchedContentsSelector.selectAll);
  const searchedKeyword = useSelector(searchKeywordSelector);
  const { isOpen, handleClose, handleOpen, currentContent } = useModalControl();
  const { providerData, resetCurrentData } = useContentsProvider(
    currentContent?.id ? currentContent.id : 0
  );

  const handleCloseModal = (): void => {
    resetCurrentData();
    handleClose();
  };

  const result = {
    handleCloseModal,
    isOpen,
    handleOpen,
    providerData,
    searchedKeyword,
    contents,
    currentContent,
    loading,
  };
  return result;
};
