import { RootState } from "../../../store/store";

export const contentsSelectors = {
  selectLoadingState: (state: RootState) => state.contents.loading.isProcessing,
  selectLoadingMessage: (state: RootState) => state.contents.loading.message,
  selectContents: (state: RootState) => state.contents.data,
};
