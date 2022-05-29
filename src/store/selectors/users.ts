import { RootState } from "..";

export const userSelectors = {
  email: (state: RootState) => state.user.email,
  userName: (state: RootState) => state.user.userName,
  id: (state: RootState) => state.user.id,
};
