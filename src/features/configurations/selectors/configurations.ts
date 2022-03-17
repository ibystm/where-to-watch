import { RootState } from "../../../store/store";

export const configurationsSelector = {
  secureImageUrl: (state: RootState) =>
    state.configurations.images?.secure_base_url,
  posterSizes: (state: RootState) => state.configurations.images?.poster_sizes,
};
